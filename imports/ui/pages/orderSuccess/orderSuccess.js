import './orderSuccess.html';
import { Products } from '../../../api/branches/branches';
import { Orders } from '../../../api/orders/orders.js';
import { Meteor } from 'meteor/meteor';

Template.orderSuccess.onRendered(function() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, options);
});

Template.recommendedProducts.helpers({
    recommendedProducts() {
        return Products.find({category: Orders.findOne({owner: Meteor.userId()}, { sort: { createdAt: -1 } }).category});
    },
    recommendationId() {
        return Products.find({category: Orders.findOne({owner: Meteor.userId()}, { sort: { createdAt: -1 } })._id});
    },
    imageURL() {
        return Products.find({category: Orders.findOne({owner: Meteor.userId()}, { sort: { createdAt: -1 } }).imageURL});
    }
});