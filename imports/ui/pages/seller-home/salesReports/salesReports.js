import './salesReports.html';
import { Branches } from '../../../../api/branches/branches.js';
import { Orders } from '../../../../api/orders/orders.js';

function checkItemPresence(array, searchID) {
  let indexFound = -1;
  //Find if element of id exists in calcResults itemlist already and get the index.
  array.forEach(function(innerElement, index) {
    if (innerElement.itemID == searchID) {
      indexFound = index;
    }
  });
  return indexFound;
}

function calculateStatistics(orders) {

  var calcResults = {
    grossIncome: 0,
    orderCount: 0,
    itemCount: 0,
    itemList: [],
  }
  //For each order in the list of orders relevant to this time scale.
  orders.forEach(function(orderElement) {
    calcResults.grossIncome += orderElement.totalPrice; //Add the sumtotal of the order to grossIncome
    calcResults.orderCount++;

    //For each item in the item list
    orderElement.itemList.forEach(function(itemElement) {
      //Only add item to itemlist if it was sold by this branch
      //As order can have items from multiple branchesList
      if (itemElement.supplier === Meteor.user().allocatedBranch) {

        var foundIndex = checkItemPresence(calcResults.itemList, itemElement.itemID);

        if(foundIndex == -1) {
          calcResults.itemList.push(itemElement);
          calcResults.itemCount += parseInt(itemElement.quantity);
        } else {
          calcResults.itemList[foundIndex].quantity += parseInt(itemElement.quantity);
          calcResults.itemCount += parseInt(itemElement.quantity);
        }
      }
    });


  });

  return calcResults;
}

Template.salesReports.onRendered(function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems);
});

Template.salesReports.onCreated(function() {
  Meteor.subscribe('userData');
  Meteor.subscribe('branchOrders');
  Meteor.subscribe('branchesList');
});

Template.salesReports.helpers({
  saleTime() {
    return FlowRouter.getParam('saleTime');
  },
  thisBranch() {
    try {
      return Branches.findOne({_id: Meteor.user().allocatedBranch});
    } catch(e) {
      return;
    }
  },
  orders() {
    return Orders.find({createdAt:{$gte: moment().subtract(FlowRouter.getParam('saleTime'), "days").toDate(), $lt: moment().toDate()}}, { sort: { createdAt: -1 } });
  },
  salesStatistics() {
    var ordersToProcess = Orders.find({createdAt:{$gte: moment().subtract(FlowRouter.getParam('saleTime'), "days").toDate(), $lt: moment().toDate()}}, { sort: { createdAt: -1 } });
    var calcResults = calculateStatistics(ordersToProcess);
    return calcResults;
  },
  currDate() {
    return moment();
  }
});

Template.salesReports.events({
  'click #saveReport' (event, template) {
    window.print();
  },
});
