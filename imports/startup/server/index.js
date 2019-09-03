// Import server startup through a single index entry point
import { Roles } from 'meteor/alanning:roles'

import './fixtures.js';
import './register-api.js';

// Needed for first admin
//Roles.addUsersToRoles('3zgRymbeviZewzNeJ', ['admin']);

Meteor.publish('userList', function() {
  if (!this.userId) {
    return this.ready();
  }
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({}, {
      //Fields to publish, needs to be limited due to security reasons
      //Admins should not have access to user passwords
      fields: {
        _id: 1,
        username: 1,
        roles: 1,
        emails: 1,
        createdAt: 1,
      }
    });
  } else {
    return this.ready();
  }
});

Meteor.methods({
  'userTableEntry.promoteUser'({userId}) {
    new SimpleSchema({
      userId: { type: String },
    }).validate({ userId });

    if (Roles.userIsInRole(this.userId, 'admin')) {
      Roles.addUsersToRoles(userId, 'seller');
    } else {
      return new Error('Not authorised!');
    }
  },
  'userTableEntry.demoteUser'({userId}) {
    new SimpleSchema({
      userId: { type: String },
    }).validate({ userId });

    if (Roles.userIsInRole(this.userId, 'admin')) {
      Roles.removeUsersFromRoles(userId, 'seller');
    } else {
      return new Error('Not authorised!');
    }
  }
});
