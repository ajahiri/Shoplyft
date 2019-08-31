import './signup_form.html';

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
      if (password != confPassword) {
        throw new Error("Passwords don't match!");
      }
      Accounts.createUser(
          {
            username: username,
            email: email,
            password: password,
            profile: {
              role:'customer'
            }
          },
        function (error) {
          if (error) {
            console.log(error.reason);
            return;
          }
        });
      console.log('USER CREATED!');
      M.toast({html: 'New Account Created successfully'})
    } catch (e) {
      console.log(e);
    }

  },
  'click #logOutButton'(event) {
    Meteor.logout();
    M.toast({html: 'You have successfully logged out'})

  }
});
