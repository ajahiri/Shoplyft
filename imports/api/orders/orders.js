export const Orders = new Mongo.Collection('order');

Orders.schema = new SimpleSchema({
  _id: { type: String },
  owner: { type: String },    //UserID of the owner of this order
  branch: { type: String },   //ID of branch order was made from
  itemList: { type: [Object] },   //This means the cart will be an array of objects, (product ID and qty & price of !!EACH!!!)
  "itemList.productId": {
    type: String
  },
  "itemList.quantity": {
    type: Number
  },
  "itemList.price": {
    type: Number
  },
  totalPrice: { type: Number },
  payment: { type: Object },   //Will have to think about this later.
  shipping: { type: Object }   //This should just be form the users address. WIll figure out how we handle this later.
});
