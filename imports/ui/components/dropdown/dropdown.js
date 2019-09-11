import './dropdown.html';

import { Branches } from '../../../api/branches/branches.js';

Template.dropdown.onCreated(function() {
    Meteor.subscribe('branchesList');
});

Template.dropdown.helpers({
  branchesFound() {
    return Branches.find({});
  },
});

Template.branchDropOption.helpers({
  branchName() {
    return this.name;
  },
  branchID() {
    return this._id;
  }
});

Template.dropdown.onRendered(function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});
