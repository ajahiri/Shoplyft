import './login_form.html';

Template.login_form.onRendered(function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

Template.login_form.events({
  'submit #resetForm'(event) {
    //Prevent default browser form submission
    event.preventDefault();
    const target = event.target;
    //Get our data values from the DOM
    const resetEmail = target.resetEmail.value;
    Accounts.forgotPassword({email: resetEmail}, function(error) {
      if (error) {
        M.toast({html: error.reason});
      } else {
        target.reset();
        M.toast({html: "Reset email sent!"});
      }
    });
  },
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
      } else {
        FlowRouter.go('App.home');
        M.toast({html: 'Successfully logged in!'});
      }
    });
  },
  'click #logOutButton'(event) {
    M.toast({html: 'Successfully logged out!'});
    Meteor.logout();
  }
});
