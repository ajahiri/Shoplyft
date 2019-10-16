import './product_detailview.html';
import { Products } from '../../../api/branches/branches.js';
import { Branches } from '../../../api/branches/branches.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

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
    var qty = parseInt(event.target.addQty.value);
    var itemID = template.data._id;
    //console.log(template.data);
    Meteor.call('shoppingCart.addCartItem', itemID, qty, (error, result) => {
      if (error) {
        M.toast({html: error});
      } else {
        event.target.reset();
        M.toast({html: 'Item added to cart'});
      }
    });
  },
  'click #deleteButton' (event, template) {
    event.preventDefault();
    //console.log(template.data);
    var itemID = template.data._id;
    Meteor.call('deleteProduct', itemID, (error, result) => {
      if (error) {
        M.toast({html: error.reason});
      } else {
        $('.modal').modal('close');
        FlowRouter.go('App.home');
        M.toast({html: 'Product deleted from site!'});
        FlowRouter.go('/');
      }
    });
  },
  'submit #updateProductForm' (event, template) {
    //Prevent default browser form submission
    event.preventDefault();
    var itemID = template.data._id;
    //Get data from DOM
    const target = event.target;
    var updatedDetails = {
      productName: target.item_name.value,
      stock: target.item_stock.value,
      price: target.item_price.value,
      category: target.item_category.value,
      description: target.item_description.value,
      promotionalBool: $('#promoCheck').is(':checked'),
    };

    Meteor.call('updateProductDetails', itemID, updatedDetails, (error, result) => {
      if (error) {
        M.toast({html: error.reason});
      } else {
        M.toast({html: 'Successfully updated product details!'});
      }
    });
  }
})
