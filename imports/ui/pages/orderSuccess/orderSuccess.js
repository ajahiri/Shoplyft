import './orderSuccess.html';
import { Products } from '../../../api/branches/branches';
import { Orders } from '../../../api/orders/orders.js';
import { Meteor } from 'meteor/meteor';

var recommendIsLoading = new ReactiveVar(true);

Template.orderSuccess.onCreated(function() {
    Meteor.subscribe('userOrders');
    Meteor.subscribe('productList');
});


function consolidateCategories() {
    var userOrders = Orders.find({owner: Meteor.userId()});
    var categoriesRaw = [];

    userOrders.forEach(singleOrder => {
        //Code to run for each order made by user
        singleOrder.itemList.forEach(orderItem => {
            //Code to run for each item in the order
            if (Products.findOne({_id: orderItem.itemID})) {
                var itemCategory = Products.findOne({_id: orderItem.itemID}).category;
                //Take into account the quantity of the item bought, if I buy 2 items 
                //of category Monitor, Monitor should be in the list twice
                for (i = 0; i < orderItem.quantity; i++) {
                    categoriesRaw.push(itemCategory);
                }
            }
        });
    });

    return categoriesRaw;
}

function findMode(array) {
    let counted = array.reduce((acc, curr) => { 
        if (curr in acc) {
            acc[curr]++;
        } else {
            acc[curr] = 1;
        }

        return acc;
    }, {});

    let mode = Object.keys(counted).reduce((a, b) => counted[a] > counted[b] ? a : b);

    return mode;
}

Template.recommendation.helpers({ 
    recommendIsLoading() {
      return recommendIsLoading.get();
    },
    recommendedProducts() {
        var commonCategory; 
        try {
            commonCategory = findMode(consolidateCategories());
            var recommendationArray = Products.find({category: commonCategory}).fetch();
            var recommendationResults = [];
            for(i = 0; i < 4; i++) {
              var randomIndex = Math.floor( Math.random() * recommendationArray.length );
              recommendationResults.push(recommendationArray[randomIndex]);
            }
        } catch (e) {};

        return recommendationResults;
    }, 
});