// Client entry point, imports all client code
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Session } from 'meteor/session';

Accounts.onEmailVerificationLink(function(token, done){
  try {
    Accounts.verifyEmail(token);
    FlowRouter.go("App.MyAccount");
    M.toast({html: "Successfully verified email!"});
  } catch (e) {
    M.toast({html: e.reason});
  }
});

Accounts.onResetPasswordLink(function(token, done){
  Session.set('resetPasswordToken', token);
  BlazeLayout.render('App_body', { main: 'resetPassword' });
});


import '/imports/startup/client';
import '/imports/startup/both';
