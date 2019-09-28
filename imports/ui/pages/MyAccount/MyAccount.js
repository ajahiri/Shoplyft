import './MyAccount.html';
import { Meteor } from 'meteor/meteor';
import { Branches } from '../../../api/branches/branches.js';

Template.App_MyAccount.onCreated(function(){
  Meteor.subscribe('userData');
  Meteor.subscribe('branchesList');
});

Template.App_MyAccount.helpers({
    getUsername() {
        return Meteor.user().username;
    },
    getEmail() {
        return Meteor.user().emails[0].address;
    },
    verified() {
        return Meteor.user().emails[0].verified;
    },
    getRoles() {
        if (Meteor.user().roles) {
            return Meteor.user().roles;
        }
    },
    getBranch() {
      //Check if the user has an allocated Branch first.
      //This is important to avoid errors.
      //We can then access the branch attributes within the HTML code using Spacebars i.e. {{getBranch.name}}
      if (Meteor.user().allocatedBranch) {
        return Branches.findOne({_id: Meteor.user().allocatedBranch}).name;
      } else {
        return null;
      }
    },
    //Will check if user has an allocatedBranch attribute.
    hasBranch() {
      if (Meteor.user().allocatedBranch) {
        return true;
      } else {
        return false;
      }
    }
});
