// Server entry point, imports all server code

import '/imports/startup/server';
import '/imports/startup/both';

// Deny all client-side updates to user documents
Meteor.users.deny({
  update() { return true; }
});

Roles.addUsersToRoles('X7neTbLQi8NZBTKEB', 'admin');
