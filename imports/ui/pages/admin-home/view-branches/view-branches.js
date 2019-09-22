import './view-branches.html';
import { Branches } from '../../../../api/branches/branches.js';

Template.viewBranches.onCreated(function() {
    Meteor.subscribe('branchesAdmin');
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
    + addressObject.street + " " + addressObject.postCode + " " + addressObject.city;
    return fullAddress;
  }
});
