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

Meteor.publish('specificOrder', function(id) {
  if (!this.userId) {
    return this.ready();
  } else if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
    return Orders.find({_id: id});
  } else {
    //Will find order where userID is owner
    //Clever way  to make sure users that made that order can see that order
    return Orders.find({owner: this.userId, _id: id});
  }

});

Meteor.publish('branchOrders', function() {
  if (!this.userId) {
    return this.ready();
  } else if (Roles.userIsInRole(Meteor.userId(), 'seller')) {
    var thisBranch = Meteor.user().allocatedBranch;
    return Orders.find({branches: thisBranch});
  } else {
    return this.ready();
  }
});
