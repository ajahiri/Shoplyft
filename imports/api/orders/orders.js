export const Orders = new Mongo.Collection('order');

Orders.schema = new SimpleSchema({
  _id: { type: String },
  owner: { type: String },    //UserID of the owner of this order
  createdAt: { type: Date },
  itemList: { type: [Object] },   //This means the cart will be an array of objects, (product ID and qty & price of !!EACH!!!)
  "itemList.itemID": {
    type: String
  },
  "itemList.name": {
    type: String
  },
  "itemList.price": {
    type: Number
  },
  "itemList.quantity": {
    type: Number
  },
  "itemList.supplier": {
    type: String
  },
  branches: { type: Object },   //Need a branches list of IDs to make it easy to do some mor estyff laterer
  totalPrice: { type: Number }, //To be computed in server method.
  payment: { type: Object },   //Parse payment info from client.
  billingInfo: { type: Object }   //Parse billing info from client.
});
