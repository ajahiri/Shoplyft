import { ShoppingCarts } from './shoppingCart.js';

//Insert cart item
Meteor.methods({
  'shoppingCart.addCartItem'({prodId, qty}) {
    //Check if item already in cart
    //Search array for object with that productId
    //First check if cart exists
    if (Meteor.user().cart) {
      if (Meteor.user().cart.find(item => item.prodId === prodId)) {
        Meteor.users.update({_id: this.userId, 'cart.prodId': prodId}, {$inc: {'cart.$.qty': 1}});
      } else {
        //If the item does not already exist in the cart
        Meteor.users.update(this.userId, {$push: {cart: {prodId: prodId, qty: qty}}});
      }
    } else {
      //If cart doesn't exist, we can still use update, this will avoid errors
      Meteor.users.update(this.userId, {$push: {cart: {prodId: prodId, qty: qty}}});
    }
  },
  'shoppingCart.removeCartItem'({prodId}) {
    Meteor.users.update({_id: Meteor.userId()}, { $pull: { "cart" : {prodId: prodId}}});
  }
});
