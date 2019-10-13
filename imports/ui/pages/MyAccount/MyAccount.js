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
  },
  'submit #modalSaveForm': function(event) {
    event.preventDefault();
    var newEmail = event.target.newEmail.value;
    if (newEmail == Meteor.user().emails[0].address)
    {
      M.toast({html: "Email is already assigned."})
      event.target.reset();
    } else {
      Meteor.call('replaceEmail', newEmail, function(error) {
        if (error) {
          M.toast({html: error});
        } else {
          event.target.reset();
          M.toast({html: "Successfully changed email!"});
          instance.close();

        }
      });
    }
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
      try {
        return Meteor.user().emails[0].address;
      } catch (e) {
        return null;
      }
    },
    verified() {
      try {
        return Meteor.user().emails[0].verified;
      } catch (e) {
        return false;
      }
    },
    getRoles() {
        if (Meteor.user().roles) {
            return Meteor.user().roles;
        }
    },
    orders() {
      return Orders.find({owner: Meteor.userId()}, { sort: { createdAt: -1 } });
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

Template.transactionEntry.helpers({
  createdAtDate() {
    var date = this.createdAt;
    return moment(date).format("DD-MM-YYYY");
  },
});
