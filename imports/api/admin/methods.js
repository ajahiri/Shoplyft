//import { Branches } from '../collections/Branches.js';
import { Random } from 'meteor/random';
import { Products, Branches } from '../branches/branches';

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
  'deleteUser'(userId) {
    new SimpleSchema({
      userId: { type: String },
    }).validate({ userId });

    if (Roles.userIsInRole(this.userId, 'admin')) {
      if (Meteor.users.findOne({_id: userId}).allocatedBranch && Meteor.users.findOne({_id: userId}).allocatedBranch != '') {
        //This means the user is allocated to a branch, do not allow deletion.
        throw new Meteor.Error('Deletion error.', 'User is allocated to a branch, remove branch first.');
      } else {
        //Otherwise, allow deletion
        Meteor.users.remove({ _id: userId }, function(error, result) {
          if (error) {
            new Error('Error removing user.');
          }
        });
      }
    } else {
      return new Error('Not authorised!');
    }
  },
  'deleteBranch'(branchID) {
    new SimpleSchema({
      branchID: { type: String },
    }).validate({ branchID });

    try {
      if (Roles.userIsInRole(this.userId, 'admin')) {
        // Remove products associated with this branch
        Products.remove({branch: branchID});
        //Update branch owner's user document and remove their allocatedBranch attribute.
        Meteor.users.update({_id: Branches.findOne({_id: branchID}).seller}, { $unset: { allocatedBranch: "" } });
        //Finally remove the branch itself.
        Branches.remove({_id: branchID}, {justOne: true});
      } else {
        throw new Meteor.Error('Not authorised!');
      }
    } catch (error) {
      throw new Meteor.Error('Deletion error.', error);
    }
  },
});
