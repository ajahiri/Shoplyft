import { ShoppingCarts } from '../shoppingCart.js';

Meteor.publish('userCart', function() {
  if (!this.userId) {
    return this.ready();
  } else {
    return ShoppingCarts.findOne({owner: this.userId});
  }
});
