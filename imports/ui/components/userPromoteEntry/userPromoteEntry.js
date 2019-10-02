import './userPromoteEntry.html';
import { Branches } from '../../../api/branches/branches.js';

Template.userPromoteEntry.helpers({
  role() {
    if (this.roles) {
      return this.roles;
    }
  },
  branch() {
    if (this.allocatedBranch) {
      return Branches.findOne({_id: this.allocatedBranch}).name;
    } else {
      return 'Unassigned';
    }
  },
  userIsSeller() {
    if (Roles.userIsInRole(this, 'seller')) {
      return true;
    } else {
      return false;
    }
  }
});

Template.userPromoteEntry.events({
  'click #promote'(event) {
    var selectedUserID = this._id;
    Meteor.call('userTableEntry.promoteUser', {
      userId: selectedUserID,
    }, (err, res) => {
      if (err) {
        M.toast({html: 'Unable to promote user. Error: ' + err.reason});
      } else {
        //success
        M.toast({html: 'User promoted to seller.'});
      }
    });
  },
  'click #demote'(event) {
    var selectedUserID = this._id;
    Meteor.call('userTableEntry.demoteUser', {
      userId: selectedUserID,
    }, (err, res) => {
      if (err) {
        M.toast({html: 'Unable to demote user. Error: ' + err.reason});
      } else {
        //success
        M.toast({html: 'User demoted from seller.'});
      }
    });
  }
});
