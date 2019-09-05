// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';

// Deny all client-side updates to user documents
Meteor.users.deny({
  update() { return true; }
});

//Add all users to default "customer" role on creation
//This doesn't work, not actually needed, will be removed next release.
Accounts.onCreateUser((options, user) => {
  Roles.addUsersToRoles(user._id, 'customer');
  return user;
});
