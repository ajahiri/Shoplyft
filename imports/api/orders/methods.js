import { Random } from 'meteor/random';
import { Branches } from '../branches/branches.js';
import { Products } from '../branches/branches.js';
import { Orders } from './orders.js';

Meteor.methods({
  makePayment(billingInfo, creditCard) {
    //Get the users items that they want to purchase
    var itemPurchase = Meteor.users.findOne({_id: Meteor.userId()}).cart;
    if (itemPurchase.length === 0) {
      throw new Meteor.Error('BUSINESS-LOGIC', 'Cart is empty, nothing to process!');
    }

    //I would use the cart reference IDs but I think that it would make more sense to have
    //The archived version of all products, their prices, descvriptions, etc in case they changed
    //I think it makes more sense when looking back at an order that was made that the prices and
    //product data is persistent from when it was bought rather than what it is at the time.
    //As such, we will build a cart items object to save into orders.
    var archiveCartItems = [];
    //Cart LOOP
    //Use this to get total price of order
    //Also use this to update stock of each product
    var cartTotal = 0;
    var supplierList = [];
    itemPurchase.forEach(function(element) {
      //Get product Price
      var price = Products.findOne({_id: element.prodId}).price;
      //Check if there is a disparity of quantities and stock
      if ( (Products.findOne({_id: element.prodId}).stock) <= 0) {
        throw new Meteor.Error('BUSINESS-LOGIC', 'An item is out of stock!');
      } else if ( (element.qty < 1) ) {
        throw new Meteor.Error('BUSINESS-LOGIC', 'Quantity to order is invalid.');
      } else if ((element.qty > Products.findOne({_id: element.prodId}).stock)) {
        throw new Meteor.Error('BUSINESS-LOGIC', 'Quantity is higher than available stock, cannot process order!');
      } else {
        Products.update({_id: element.prodId}, { $inc: { stock: (parseInt(element.qty) * -1) } });
      }

      cartTotal += (parseFloat(price) * parseInt(element.qty));
      var product = Products.findOne({_id: element.prodId});

      //Only add branch ids to supplier list if they do not exist in the array
      if (!supplierList.includes(product.branch)) {
        supplierList.push(product.branch);
      }
      archiveCartItems.push({
        itemID: product._id,
        name: product.name,
        price: product.price,
        quantity: element.qty,
        supplier: product.branch,
      }); //No need to save description.
    });

    var newOrder = {
      _id: Random.id(),
      owner: Meteor.userId(),
      orderDate: new Date(),
      itemList: archiveCartItems,
      totalPrice: cartTotal,
      payment: creditCard,
      billingInfo: billingInfo,
      branches: supplierList,
    }

    Orders.insert(newOrder);
    Meteor.users.update({_id: Meteor.userId()}, { $set: {cart: []} });
    Email.send({
      from: "no-reply@shoplyft.me",
      to: Meteor.users.findOne({_id: Meteor.userId}).emails[0].address,
      subject: "Order: " + newOrder._id + " has successfully been processed.",
      text: "Hi " + (Meteor.users.findOne({_id: Meteor.userId}).username) + ".\n\n Your order at Shoplyft.me has successfully been processed. \n\n Thank you for shopping at ShopLyft!",
    });
  },
});
