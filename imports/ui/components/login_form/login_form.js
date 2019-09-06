import './login_form.html';

Template.login_form.events({
  'submit #login-form'(event) {
    //Prevent default browser form submission
    event.preventDefault();

    //Get our data values from the DOM
    const target = event.target; //target
    const username = target.username.value;
    const password = target.password.value;

    Meteor.loginWithPassword(username, password, function(error){
      if (error){
        M.toast({html: error.reason});
      }
    });
    Accounts.onLogin(function() {
      FlowRouter.go('App.home');
      M.toast({html: 'Successfully logged in!'});
    });
  },
  'click #logOutButton'(event) {
    M.toast({html: 'Successfully logged out!'});
    Meteor.logout();
  }
});
