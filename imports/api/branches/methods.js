import { Random } from 'meteor/random';
import { Branches } from './branches.js';

Meteor.methods({
  'addBranches.addNewBranch'({
    branchName,
    phoneNumber,
    contactEmail,
    unitNumber,
    streetNumber,
    streetName,
    city,
    postCode,
    seller
  }) {
    if (Roles.userIsInRole(this.userId, 'admin')) {
      const address = {
        unitNo: unitNumber,
        street: streetName,
        streetNumber: streetNumber,
        city: city,
        postCode: postCode
      };
      const newBranch = {
        _id: Random.id(),
        name: branchName,
        seller: seller,
        email: contactEmail,
        phoneNumber: phoneNumber,
        address: address,
        createdAt: new Date(),
        products: [],
      }
      Branches.schema.validate(newBranch);
      if (Meteor.users.findOne({_id: seller}).allocatedBranch) {
        throw new Meteor.Error('Violation of business logic.', "Seller is already allocated to a branch!")
      } else {
        Meteor.users.update({_id: seller}, {$set: {allocatedBranch: newBranch._id} });
        Branches.insert(newBranch);
      }
    } else {
      return new Meteor.Error('Authorization error.','Not authorised!');
    }
  },
  'addNewProduct.addProduct'({
    name,
    imageLink,
    stock,
    price,
    description
  }) {
    if (Roles.userIsInRole(this.userId, 'seller')) {
      if(!Meteor.user().allocatedBranch) {
        throw new Meteor.Error('Fail in business logic!','This seller has not been assigned a branch yet!');
      }
      const sellerBranch = Meteor.user().allocatedBranch;
      const newProduct = {
        _id: Random.id(),
        name: name,
        description: description,
        price: price,
        imageURL: imageLink,
        stock: parseInt(stock),
        createdAt: new Date()
      }
      const productSchema = new SimpleSchema({
        _id: { type: String },
        name: { type: String },
        description: { type: String },
        price: { type: String },
        imageURL: { type: String },
        stock: { type: Number },
        createdAt: { type: Date },
      }).validate(newProduct);

      Branches.update({_id: sellerBranch}, {
        $push: {
          products: newProduct,
        }
      });
    } else {
      return new Meteor.Error('Authorization error.','Not authorised!');
    }
  }
});
