// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';
// Deny all client-side updates to user documents
Meteor.users.deny({
  update() { return true; }
});

Meteor.methods({
  sendVerify() {
    try {
      Accounts.sendVerificationEmail(this.userId);
    } catch (e) {
      throw new Meteor.Error('email error', 'Failed to send verification email!');
    }
  },
  replaceEmail(email) {
    try {
      Accounts.addEmail(Meteor.userId(), email);
      //Accounts.sendVerificationEmail(Meteor.userId(), email); //This is causing an issue at the moment will fix later.
      //Users can still just click the send verification link to send a verification email
      Accounts.removeEmail(Meteor.userId(), Meteor.user().emails[0].address);
    } catch (e) {
      throw new Meteor.Error('Email update error.', e.reason);
    }
  }
});

//Following Publish needed to have allocatedBranch attribute given to clients.
Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { allocatedBranch: 1, cart: 1, billingInfo: 1}
    });
  } else {
    this.ready();
  }
});

//Used to add a preset user to admin role. For testing.
//Roles.addUsersToRoles('GhgDfRGgEhCbSz7JH', 'admin');
