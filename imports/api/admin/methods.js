//import { Branches } from '../collections/Branches.js';
import { Random } from 'meteor/random';

// Needed for first admin
Roles.addUsersToRoles('8kppYzZvPxm4Gy7Ra', ['admin']);

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
  },
});
