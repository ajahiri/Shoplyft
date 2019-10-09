import './view-transactions.html';
import { Branches } from '../../../../api/branches/branches.js';
import { Orders } from '../../../../api/orders/orders.js';


Template.sellerTransactions.onCreated(function() {
  Meteor.subscribe('userData');
  Meteor.subscribe('branchOrders');
});

Template.sellerTransactions.helpers({
  orders() {
    try {
      var thisBranch = Meteor.user().allocatedBranch;
      return Orders.find({branches: thisBranch});
    } catch (e) {
      return null;
    }
  },
});
