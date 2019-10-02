import { Orders } from '../orders.js';

Meteor.publish('allOrders', function() {
  if (!this.userId) {
    return this.ready();
  }
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Orders.find({});
  } else {
    return this.ready();
  }
});

Meteor.publish('userOrders', function() {
  if (!this.userId) {
    return this.ready();
  } else {
    return Orders.find({owner: this.userId});
  }
});

Meteor.publish('branchOrders', function() {
  if (!this.userId) {
    return this.ready();
  } else if (Roles.userIsInRole(Meteor.userId(), 'seller')) {
    var thisBranch = Meteor.users.findOne({_id: Meteor.userId()}).allocatedBranch;
    return Orders.find({branches: thisBranch});
  } else {
    return this.ready();
  }
});
