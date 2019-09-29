import './cart_products.html';
import { Products } from '../../../api/branches/branches.js';

Template.cart_products.onCreated(function() {
    Meteor.subscribe('productList');
    Meteor.subscribe('userData'); //Needed to know cart contents
});

Template.cart_products.helpers({
  cartItems() {
    if (Meteor.user()) {
      return Meteor.user().cart;
    } else {
      return;
    }
  }
});

Template.cartEntry.events({
  'click #deleteEntry' (event, template) {
    event.preventDefault();
    Meteor.call('shoppingCart.removeCartItem', {
      prodId: template.data.prodId,
    });
    M.toast({html: 'Item removed from cart'})
  }
});

Template.cartEntry.helpers({
  itemName() {
    return Products.findOne({_id: this.prodId}).name;
  },
  itemPrice() {
    return Products.findOne({_id: this.prodId}).price;
  },
  itemURL() {
    return Products.findOne({_id: this.prodId}).imageURL;
  }
});
