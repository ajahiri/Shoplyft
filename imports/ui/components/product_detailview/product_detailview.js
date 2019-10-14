import './product_detailview.html';
import { Products } from '../../../api/branches/branches.js';
import { Branches } from '../../../api/branches/branches.js';

Template.productBody.onRendered(function(){
  $('html,body').scrollTop(0);
  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems);
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
})

Template.product_detailview.onCreated(function(){
  Meteor.subscribe('specificProduct', FlowRouter.getParam('_id'));
  Meteor.subscribe('branchesList');
  //console.log(FlowRouter.getParam('_id'));
});

Template.product_detailview.helpers({
  product() {
    return Products.find({_id: FlowRouter.getParam('_id')});
  },
});

Template.productBody.helpers({
  branchName() {
    if (Branches.findOne({_id: this.branch})) {
      return Branches.findOne({_id: this.branch}).name;
    } else {
      return;
    }
  }
});

Template.productBody.events({
  'submit #addStockForm'(event, template) {
    event.preventDefault();
    var stockAmt = parseInt(event.target.addStock.value);
    var itemID = template.data._id;
    Meteor.call('addStock', itemID, stockAmt, (error, result) => {
      if(error) {
        M.toast({html: error.reason});
      } else {
        M.toast({html: 'Successfully added stock!'});
        event.target.reset();
      }
    });
  },
  'submit #addToCart' (event, template) {
    event.preventDefault();
    var qty = event.target.addQty.value;
    //console.log(template.data);
    if(qty>=1){
    Meteor.call('shoppingCart.addCartItem', {
      prodId: template.data._id,
      qty: qty,
    });
    M.toast({html: 'Item added to cart'});
    } else {
      M.toast({html: 'Invalid Quantity'});
    }
  },
  'click #deleteButton' (event, template) {
    event.preventDefault();
    //console.log(template.data);
    var itemID = template.data._id;
    Meteor.call('deleteProduct', itemID, (error, result) => {
      if (error) {
        M.toast({html: error.reason});
      } else {
        M.toast({html: 'Product deleted from site!'});
      }
    });
  },
})
