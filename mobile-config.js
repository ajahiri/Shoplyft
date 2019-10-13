// This section sets up some basic app metadata, the entire section is optional.
App.info({
  id: 'com.annulus_studios.shoplyft',
  name: 'ShopLyft',
  description: 'Making shopping easy.',
  author: 'Annulus Studios',
  email: 'annulus.studios@gmail.com',
  website: 'https://shoplyft.me/',
  version: '0.2.4',
  buildNumber: '32'
});

App.setPreference('android-targetSdkVersion', '28');
// Set up resources such as icons and launch screens.
App.icons({
  'android_mdpi': 'androidAssets/icons/icon-48-mdpi.png',
  'android_hdpi': 'androidAssets/icons/icon-72-hdpi.png',
  'android_xhdpi': 'androidAssets/icons/icon-96-xhdpi.png',
  'android_xxhdpi': 'androidAssets/icons/icon-144-xxhdpi.png',
  'android_xxxhdpi': 'androidAssets/icons/icon-192-xxxhdpi.png',
  // More screen sizes and platforms...
});
App.launchScreens({
  'android_ldpi_portrait': 'androidAssets/splashes/splash-port-ldpi.png',
  'android_mdpi_portrait': 'androidAssets/splashes/splash-port-mdpi.png',
  'android_hdpi_portrait': 'androidAssets/splashes/splash-port-hdpi.png',
  'android_xhdpi_portrait': 'androidAssets/splashes/splash-port-xhdpi.png',
  // More screen sizes and platforms...
});

// Set PhoneGap/Cordova preferences.
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');

//Push Notifications
/*App.configurePlugin('phonegap-plugin-push', {
  SENDER_ID: 659123908175
});*/

//App.accessRule("*");
