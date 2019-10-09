import { Mongo } from 'meteor/mongo';

export const Branches = new Mongo.Collection('branches');
export const Products = new Mongo.Collection('products');
//const FeaturedProducts = new Mongo.Collection('FeaturedProducts');  //This may or may not be used as a separate collection

Branches.schema = new SimpleSchema({
  _id: { type: String },
  name: { type: String },
  seller: { type: String },
  email: { type: String },
  address: { type: Object },
  "address.unitNo": {
    type: String              //Can have unit numbers 3A 2B etc
  },
  "address.street": {
    type: String
  },
  "address.streetNumber": {
    type: String              //Using string as we might expect street numbers with special characters (e.g 1-13 or 1/34)
  },
  "address.city": {
    type: String
  },
  "address.state": {
    type: String
  },
  "address.postCode": {
    type: Number              //Australian postal codes are always numbers
  },
  phoneNumber: { type: String},
  createdAt: { type: Date }
});

Products.schema = new SimpleSchema({
  _id: { type: String },
  branch: { type: String },
  promotional: { type: Boolean },
  name: { type: String },
  description: { type: String },
  price: { type: String },
  category: { type: String },
  imageURL: { type: String },
  stock: { type: Number },
  createdAt: { type: Date },
});
