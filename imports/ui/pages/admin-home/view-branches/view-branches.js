import './view-branches.html';
import { Branches } from '../../../../api/branches/branches.js';

Template.viewBranches.onCreated(function() {
    Meteor.subscribe('branchesAdmin');
    Meteor.subscribe('userList');
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
    var fullAddress = addressObject.unitNo + ", " + addressObject.streetNumber + " "
    + addressObject.street + ", " + addressObject.city + " " + addressObject.state + " " + addressObject.postCode;
    return fullAddress;
  },
  assignedSeller() {
    if (this.seller) {
      return Meteor.users.findOne({_id: this.seller}).username;
    } else {
      return "None";
    }
  }
});
