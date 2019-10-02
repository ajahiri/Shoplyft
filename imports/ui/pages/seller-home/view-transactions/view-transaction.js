import './view-transactions.html';
import { Branches } from '../../../../api/branches/branches.js';
import { Orders } from '../../../../api/orders/orders.js';


Template.sellerTransactions.onCreated(function() {
  Meteor.subscribe('branchOrders');
});

Template.sellerTransactions.helpers({
  orders() {
    return Orders.find();
  },
});
