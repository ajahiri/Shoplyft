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
  },
  cartTotal() {
    if (Meteor.user()) {
      if (Meteor.user().cart) {
        var cartTotal = 0;
        Meteor.user().cart.forEach(function(element) {
          //Get product Price
          var price = Products.findOne({_id: element.prodId}).price;
          cartTotal += (parseFloat(price) * parseInt(element.qty));
        });
        return (cartTotal);
      }
    }
  },

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
  },
  itemStock() {
    return Products.findOne({_id: this.prodId}).stock;
  }
});
