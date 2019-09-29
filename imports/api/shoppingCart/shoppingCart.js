export const ShoppingCarts = new Mongo.Collection('shoppingCarts');

ShoppingCarts.schema = new SimpleSchema({
  _id: { type: String },
  owner: { type: String },    //UserID of the owner of this cart
  cart: { type: [Object] },   //This means the cart will be an array of objects, (product ID and qty)
  "cart.productId": {
    type: String
  },
  "cart.quantity": {
    type: Number
  },
});
