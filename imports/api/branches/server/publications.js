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

Meteor.publish('branchesList', function() {
  return Branches.find({}, {
    fields: {
      name: 1,
      address: 1,
      products: 1,
    },
  });
});
