import { Branches } from '../branches.js';
import { Random } from 'meteor/random';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';

Meteor.publish('searchProducts', function(productName, branchID) {
  ReactiveAggregate(this, Branches, [
    //pipeline
    { $match: {_id: branchID, 'products.name': {$regex: productName}}},
    { $unwind: "$products" },
    { $match: {'products.name': {$regex: productName}}},
    { $group: {_id: Random.id(), productsFound: {$addToSet: '$products'} }}
  ], {clientCollection: 'FoundProducts'});
});

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
