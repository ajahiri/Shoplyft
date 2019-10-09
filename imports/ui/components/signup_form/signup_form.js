import './signup_form.html';
import { checkDetails } from './passwordValidator.js';

Template.signup_form.events({
  'submit #signup_form'(event) {
    //Prevent default browser form submission
    event.preventDefault();

    //Get our data values from the DOM
    const target = event.target; //target
    const username = target.username.value;
    const email = target.email.value;
    const password = target.password.value;
    const confPassword = target.confPassword.value;

    try {
      checkDetails(username, password, confPassword); //Imported function
      if (!email) {
        throw new Error("Please enter a valid email.");
      }
    } catch (e){
      M.toast({html: e});
      return;
    }

    try {
      if (password != confPxassword) {
        throw new Error("Passwords don't match!");
      }
      Accounts.createUser(
          {
            username: username,
            email: email,
            password: password,
          },
        function (error) {
          if (error) {
            M.toast({html: error.reason});
          }
        });
    } catch (e) {
      M.toast({html: e});
    }

    Accounts.onLogin(function() {
      FlowRouter.go('App.home');
      M.toast({html: 'Successfully signed in!'});
    });
  },
  'click #logOutButton'(event) {
    Meteor.logout();
    M.toast({html: 'You have successfully logged out'});
  }
});
