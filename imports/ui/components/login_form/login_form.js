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
        console.log(error.reason);
      }
    });
  },
  'click #logOutButton'(event) {
    Meteor.logout();
  }
});
