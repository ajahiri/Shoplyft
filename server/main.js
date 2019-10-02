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
});

//Following Publish needed to have allocatedBranch attribute given to clients.
Meteor.publish('userData', function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, {
      fields: { allocatedBranch: 1, cart: 1}
    });
  } else {
    this.ready();
  }
});

//Used to add a preset user to admin role. For testing.
//Roles.addUsersToRoles('GhgDfRGgEhCbSz7JH', 'admin');
