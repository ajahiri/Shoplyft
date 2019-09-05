import { Branches } from '../branches.js';

Meteor.publish('branchesAdmin', function() {
  if (!this.userId) {
    return this.ready();
  }
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Branches.find({});
  } else {
    return this.ready();
  }
});
