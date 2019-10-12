import './MyAccount.html';
import { Meteor } from 'meteor/meteor';
import { Branches } from '../../../api/branches/branches.js';
import { Orders } from '../../../api/orders/orders.js';

Meteor.methods({
  'replaceEmail'(email) {  
    Accounts.addEmail(this.userId, email);
    Accounts.sendVerificationEmail(this.userId, email);
    Accounts.removeEmail(this.user()._id, Meteor.user().emails[0].address)
  }
});

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
  },
  'submit #modalSaveForm': function(event) {
    var newEmail = event.target.newEmail.value;
    Meteor.call('replaceEmail', newEmail);
  }
});

Template.App_MyAccount.helpers({
    getUserId() {
      return Meteor.user()._id;
    },
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
      return Orders.find({owner: Meteor.userId()});
    },
    getBranch() {
      //Check if the user has an allocated Branch first.
      //This is important to avoid errors.
      //We can then access the branch attributes within the HTML code using Spacebars i.e. {{getBranch.name}}
      try {
        return Branches.findOne({_id: Meteor.user().allocatedBranch}).name;
      } catch (e) {
        return null;
      }

    },
    //Checks if user has an allocatedBranch attribute.
    hasBranch() {
      if (Meteor.user().allocatedBranch) {
        return true;
      } else {
        return false;
      }
    },
    //Checks if user has Billing Info, and sends name if true
    getBillingName()
    {
      if(Meteor.user().billingInfo.fullName){
        return Meteor.user().billingInfo.fullName;
      } else {
        return false;
      }
    },
    getBillingPhone() {
      return Meteor.user().billingInfo.phone;
    },
    getBillingStreet() {
      return Meteor.user().billingInfo.street;
    },
    getBillingCity() {
      return Meteor.user().billingInfo.city;
    },
    getBillingState() {
      return Meteor.user().billingInfo.state;
    },
    getBillingCountry() {
      return Meteor.user().billingInfo.country;
    },
    getBillingZip() {
      return Meteor.user().billingInfo.zip;
    }
});

