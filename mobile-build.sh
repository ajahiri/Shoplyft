#!/bin/bash
# This is a simple script to help me quickly build the Annulus Share application on GNU/Linux based machines. I use Manjaro Linux, the presets are set to that setup.
# Written by Arian Jahiri. (https://ait-archive.com)

# For APK signing --> jarsigner --keystore /home/arian/Android-Keystore/ -verbose -sigalg SHA1withRSA -digestalg SHA1 android-release-unsigned.apk upload
# Then align --> zipalign 4 android-release-unsigned.apk annulus-share-signed.apk
# Note, current keystore alias is "upload" hence first command having "upload" at the end.

# Set some defaults
androidHome="/home/$USERNAME/Android/Sdk"
javaHome="/usr/lib/jvm/java-8-jdk"
gradlePath="/home/$USERNAME/gradle-5.5.1/bin"

echo "==========================================================================================="
echo "|This is a simple script to help me quickly build the Annulus Share application	 	|"
echo "|on GNU/Linux based machines. I use Manjaro Linux, the presets are set to that setup.	|"
echo "==========================================================================================="

echo "Need to set ANDROID_HOME, set the directory here. (Default: $androidHome)"
echo "Press ENTER for default."

read androidHomeInput

if [ $androidHomeInput = $NULL ]
then
	echo "You've set the ANDROID_HOME to $androidHome"
	export ANDROID_HOME='$androidHome'
	androidHomeInput=$androidHome
else
	export ANDROID_HOME='$androidHomeInput'
	echo "You've set the ANDROID_HOME to $androidHomeInput"
fi

echo "==========================================================================================="
echo

echo "Going to add platform-tools to PATH, this must be within your Android SDK folder."
echo "Based on previous input, setting to $androidHomeInput/tools"

echo "*********************************"
echo
echo "YOU ALSO NEED GRADLE INSTALLED!!!"
echo
echo "*********************************"
echo "Gradle is assumed installed at /opt/gradle/gradle-4.3.1/bin"
echo "Please enter the right gradle path if above is wrong."
read gradlePathInput

if [ $gradlePathInput = $NULL ]
then
        echo "Using default gradle path, $gradlePath"
	gradlePathInput=$gradlePath
else
        echo "You've set the gradle path to $gradlePathInput"
fi

export PATH="$PATH:$androidHomeInput/tools:$gradlePathInput"

echo
echo "==========================================================================================="

echo "Need to set JAVA_HOME, set the directory here. (Default: $javaHome)"
echo "Press ENTER for default."

read javaHomeInput

if [ -z $javaHomeInput ]
then
        echo "You've set the JAVA_HOME to $javaHome"
        export JAVA_HOME=$javaHome
else
        export JAVA_HOME='$javaHomeInput'
        echo "You've set the JAVA_HOME to $javaHomeInput"
fi

echo
echo "Build process is about to start, press ENTER to continue or 'q' to quit."

read buildWarning

if [ $buildWarning = $NULL ]
then
	echo
        echo "Commencing build..."
        meteor build --server="https://shoplyft.me:443" ../studioBuilds
else
	echo
	echo "Quitting..."
fi

echo
echo
echo "DONE!"

exit
