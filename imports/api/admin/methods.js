//import { Branches } from '../collections/Branches.js';
import { Random } from 'meteor/random';

// Needed for first admin
Roles.addUsersToRoles('aLTrmJsw9cxNLnsW5', ['admin']);

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
  'deleteUser'({userId}) {
    new SimpleSchema({
      userId: { type: String },
    }).validate({ userId });

    if (Roles.userIsInRole(this.userId, 'admin')) {
      Meteor.users.remove({ _id: userId }, function(error, result) {
        if (error) {
          new Error('Error removing user.');
        }
    });
    } else {
      return new Error('Not authorised!');
    }
  },
});
