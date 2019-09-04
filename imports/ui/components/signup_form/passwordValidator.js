// Password validator.
// Using regex and Error throwing to provide user feedback.
// USer must have password with at least 1 uppercase and lowercase letters and number.
// Code modelled after: https://www.the-art-of-web.com/javascript/validate-password/

function checkPassword(str)
  {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(str);
  }

export function checkDetails(username, password, confPassword)
  {
    if(username == "") {
      throw new Error("Username cannot be blank!");
      form.username.focus();
      return false;
    }
    re = /^\w+$/;
    if(!re.test(username)) {
      throw new Error("Username must contain only letters, numbers and underscores!");
      form.username.focus();
      return false;
    }
    if(password != "" && password == confPassword) {
      if(!checkPassword(password)) {
        throw new Error("The password you have entered is not valid!");
        return false;
      }
    } else {
      throw new Error("Please check that you've entered and confirmed your password!");
      return false;
    }
    return true;
  };
