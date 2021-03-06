import { Random } from 'meteor/random';
import { Branches } from './branches.js';
import { Products } from './branches.js';
import { Images } from '../imageStore/imageStore.js';

Meteor.methods({
  'updateProductDetails'(itemID, updatedDetails) {
    if (Roles.userIsInRole(this.userId, 'seller')) {
      let branchID = Products.findOne({_id: itemID}).branch;
      if (Branches.findOne({_id:branchID}).seller === Meteor.userId()) {
        Products.update({_id: itemID}, { $set: {
          promotional: updatedDetails.promotionalBool,
          name: updatedDetails.productName,
          description: updatedDetails.description,
          price: updatedDetails.price,
          category: updatedDetails.category,
          stock: parseInt(updatedDetails.stock),
        } })
      } else {
        throw new Meteor.Error('Authorization error.','Item does not belong to your branch!');
      }
    } else {
      throw new Meteor.Error('Authorization error.','Not authorised!');
    }
  },
  'addStock'(itemID, amount) {
    if (Roles.userIsInRole(this.userId, 'seller')) {
      let branchID = Products.findOne({_id: itemID}).branch;
      if (Branches.findOne({_id:branchID}).seller === Meteor.userId()) {
        var productStock = Products.findOne({_id: itemID}).stock;
        if ( (productStock + parseInt(amount)) < 0 ) {
          throw new Meteor.Error('Logic error!','Negative stock result, please select appropriate amount.');
        } else {
          Products.update({_id: itemID}, {$inc: {stock: amount}}  );
        }
      } else {
        throw new Meteor.Error('Authorization error.','Item does not belong to your branch!');
      }
    } else {
      throw new Meteor.Error('Authorization error.','Not authorised!');
    }
  },
  'deleteProduct'(itemID) {
    if (Roles.userIsInRole(this.userId, 'admin')) {
      var imageID = Products.findOne({_id: itemID}).imageID;
      Products.remove({_id: itemID});
      Images.remove({_id: imageID});
    } else {
      throw new Meteor.Error('Authorization error.','Not authorised!');
    }
  },
  'addBranches.addNewBranch'({
    branchName,
    phoneNumber,
    contactEmail,
    unitNumber,
    streetNumber,
    streetName,
    city,
    state,
    postCode,
    seller
  }) {
    if (Roles.userIsInRole(this.userId, 'admin')) {
      const address = {
        unitNo: unitNumber,
        street: streetName,
        streetNumber: streetNumber,
        city: city,
        state: state,
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
      }
      Branches.schema.validate(newBranch);
      if (Meteor.users.findOne({_id: seller}).allocatedBranch) {
        throw new Meteor.Error('Violation of business logic.', "Seller is already allocated to a branch!")
      } else {
        Meteor.users.update({_id: seller}, {$set: {allocatedBranch: newBranch._id} });
        Branches.insert(newBranch);
      }
    } else {
      throw new Meteor.Error('Authorization error.','Not authorised!');
    }
  },
  'addNewProduct.addProduct'({
    name,
    imageLink,
    imageID,
    stock,
    price,
    category,
    description,
    promoBool
  }) {
    if (Roles.userIsInRole(this.userId, 'seller')) {
      if(!Meteor.user().allocatedBranch) {
        throw new Meteor.Error('Fail in business logic!','This seller has not been assigned a branch yet!');
      }
      const sellerBranch = Meteor.user().allocatedBranch;
      const newProduct = {
        _id: Random.id(),
        branch: sellerBranch,
        promotional: promoBool,
        name: name,
        description: description,
        price: price,
        category: category,
        imageURL: imageLink,
        imageID: imageID,
        stock: parseInt(stock),
        createdAt: new Date()
      }
      const productSchema = new SimpleSchema({
        _id: { type: String },
        branch: { type: String },
        promotional: { type: Boolean },
        name: { type: String },
        description: { type: String },
        price: { type: String },
        category: { type: String },
        imageURL: { type: String },
        imageID: { type: String },
        stock: { type: Number },
        createdAt: { type: Date },
      }).validate(newProduct);

      Products.insert(newProduct);

    } else {
      return new Meteor.Error('Authorization error.','Not authorised!');
    }
  }
});
