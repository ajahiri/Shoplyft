import './order_detailview.html';
import { Products } from '../../../api/branches/branches.js';
import { Branches } from '../../../api/branches/branches.js';
import { Orders } from '../../../api/orders/orders.js';

Template.order_detailview.onRendered(function() {
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems);
});

Template.order_detailview.onCreated(function(){
  Meteor.subscribe('specificOrder', FlowRouter.getParam('_id'));
  //console.log(FlowRouter.getParam('_id'));
});

Template.order_detailview.helpers({
  order() {
    return Orders.findOne({_id: FlowRouter.getParam('_id')});
  },
});
