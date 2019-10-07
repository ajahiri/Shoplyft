import './MyAccount.html';
import { Meteor } from 'meteor/meteor';
import { Branches } from '../../../api/branches/branches.js';
import { Orders } from '../../../api/orders/orders.js';

Template.App_MyAccount.onRendered(function(){
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

Template.App_MyAccount.onCreated(function(){
  Meteor.subscribe('userData');
  Meteor.subscribe('branchesList');
  Meteor.subscribe('userOrders');
});

Template.App_MyAccount.events({
  'click #sendVerify'(event) {
    event.preventDefault();
    try {
      Meteor.call('sendVerify');
      M.toast({html: 'Email sent!'});
    } catch(e) {
      M.toast({html: e});
    }
  },
  'submit #changePasswordForm'(event, template) {
    event.preventDefault();
    const target = event.target;
    const oldPassword = target.oldPassword.value;
    const newPassword = target.newPassword.value;
    try {
      Accounts.changePassword(oldPassword, newPassword, function(error) {
        if (error) {
          M.toast({html: error.reason});
        } else {
          target.reset();
          M.toast({html: 'Successfully changed password!'});
        }
      });
    } catch (e) {
      M.toast({html: e});
    }
  }
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
    orders() {
      return Orders.find();
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
