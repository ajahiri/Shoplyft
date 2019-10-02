import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import './resetPassword.html';

Template.resetPassword.events({
  'submit #newPassword'(event){
    event.preventDefault();
    target = event.target;
    const newPass = target.password.value;
    const newPassConf = target.confPassword.value;
    if (newPass === newPassConf) {
      Accounts.resetPassword(Session.get('resetPasswordToken'), newPass, function(error) {
        if (error) {
          M.toast({html: error.reason});
        } else {
          M.toast({html: "Sucessfully reset password!"});
          FlowRouter.go("App.login");
          Session.set('resetPasswordToken', '');
        }
      });
    } else {
      M.toast({html: "Passwords do not match!"});
    }
  }
})
