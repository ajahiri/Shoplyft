import { Mongo } from 'meteor/mongo';

export const Branches = new Mongo.Collection('branches');
//const FeaturedProducts = new Mongo.Collection('FeaturedProducts');  //This may or may not be used as a separate collection

Branches.schema = new SimpleSchema({
  _id: { type: String },
  name: { type: String },
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
  "address.postCode": {
    type: Number              //Australian postal codes are always numbers
  },
  phoneNumber: { type: String},
  products: { type: [Object], optional: true},
  "products.name": { type: String },
  "products.description": { type: String },
  "products.price": { type: Number },
  "products.imageURL": { type: String },
  "products.stock": { type: Number },
  createdAt: { type: Date }
});
