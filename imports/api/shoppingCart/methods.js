import { ShoppingCarts } from './shoppingCart.js';
import { Products } from '../branches/branches.js';
//Insert cart item
Meteor.methods({
  'shoppingCart.addCartItem'(prodId, qty) {
    //Check if item already in cart
    //Search array for object with that productId
    //First check if cart exists
    cartItem = {
      prodId: prodId,
      qty: qty,
    }
    const itemSchema = new SimpleSchema({
      prodId: { type: String },
      qty: { type: Number },
    }).validate(cartItem);

    if (!Meteor.userId()) {
      throw new Meteor.Error('Authentication Error!', 'Please login before adding items to cart!');
    } else {
      if (qty <= 0) {
        throw new Meteor.Error('Logic Error', 'Invalid quantity, must be greater than 0.');
      } else if (parseInt(Products.findOne({_id: prodId}).stock) < qty) {
        throw new Meteor.Error('Logic Error', 'Insufficient stock.');
      } else {
        if (Meteor.user().cart) {
          if (Meteor.user().cart.find(item => item.prodId === prodId)) {
            Meteor.users.update({_id: this.userId, 'cart.prodId': prodId}, {$inc: {'cart.$.qty': qty}});
          } else {
            //If the item does not already exist in the cart
            Meteor.users.update(this.userId, {$push: {cart: {prodId: prodId, qty: qty}}});
          }
        } else {
          //If cart doesn't exist, we can still use update, this will avoid errors
          Meteor.users.update(this.userId, {$push: {cart: {prodId: prodId, qty: qty}}});
        }
      }
    }
  },
  'shoppingCart.removeCartItem'({prodId}) {
    if (!Meteor.userId()) {
      throw new Meteor.error('Authentication Error!', 'Please login before removing items from cart!');
    } else {
      Meteor.users.update({_id: Meteor.userId()}, { $pull: { "cart" : {prodId: prodId}}});
    }
  }
});
