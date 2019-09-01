// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';

// Deny all client-side updates to user documents
Meteor.users.deny({
  update() { return true; }
});

//Add all users to default "customer" role on creation
Accounts.onCreateUser((options, user) => {
  Roles.addUsersToRoles(user._id, 'customer');
  return user;
});

// Ensuring every user has an email address, should be in server-side code
Accounts.validateNewUser((user) => {
  new SimpleSchema({
    _id: { type: String },
    username: { type: String },
    emails: { type: Array },
    'emails.$': { type: Object },
    'emails.$.address': { type: String },
    'emails.$.verified': { type: Boolean },
    createdAt: { type: Date },
    services: { type: Object, blackbox: true }
  }).validate(user);

  // Return true to allow user creation to proceed
  return true;
});
