import './view-branches.html';
import { Branches } from '../../../../api/branches/branches.js';

Template.viewBranches.onCreated(function() {
    Meteor.subscribe('branchesAdmin');
    Meteor.subscribe('userList');
});

Template.viewBranches.onRendered(function() {
  $('html,body').scrollTop(0);
});

Template.branchData.events({
  'click #deleteBranch'(event, template) {
    event.preventDefault();
    var branchID = template.data._id;
    Meteor.call('deleteBranch', branchID, (error) => {
      if (error) {
        M.toast({html: error});
      } else {
        M.toast({html: 'Successfully deleted branch and associated products.'});
      }
    });
  }
});

Template.viewBranches.helpers({
  branches() {
    return Branches.find({});
  },
});

Template.branchData.helpers({
  name() {
    return this.name;
  },
  location() {
    return this.address.city;
  },
  phoneNumber() {
    return this.phoneNumber;
  },
  address() {
    //Will display undefined if some of the optional data is missing
    //^ fix soon
    const addressObject = this.address;
    var fullAddress = addressObject.unitNo + " " + addressObject.streetNumber + " "
    + addressObject.street + ", " + addressObject.city + " " + addressObject.state + " " + addressObject.postCode;
    return fullAddress;
  },
  assignedSeller() {
    if (this.seller) {
      if (Meteor.users.findOne({_id: this.seller})) {
        return Meteor.users.findOne({_id: this.seller}).username;
      } else {
        return null;
      }
    } else {
      return "None";
    }
  }
});
