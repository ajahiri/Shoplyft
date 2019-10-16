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
            Array.prototype.inArray = function(comparer) { 
                for(var i=0; i < this.length; i++) { 
                    if(comparer(this[i])) return true; 
                }
                return false; 
            }; 
            
            // adds an element to the array if it does not already exist using a comparer 
            // function
            Array.prototype.pushIfNotExist = function(element, comparer) { 
                if (!this.inArray(comparer)) {
                    this.push(element);
                }
            }; 
            commonCategory = findMode(consolidateCategories());
            var recommendationArray = Products.find({category: commonCategory}).fetch();
            
            var recommendationResults = [];
            //Will keep going until the system gives us 4 random AND UNIQUE recommendation of products.
            //This will keep the system from displaying only 2 or less than 4 products.
            //This will also ensure, that, if for some reason, there are less than 4 products in a particular category, it will not display recommendations at all.
            if (recommendationArray.length >= 4) {
                while (recommendationResults.length < 4) {
                    var randomIndex = Math.floor( Math.random() * recommendationArray.length );
                    recommendationResults.pushIfNotExist(recommendationArray[randomIndex], function(e) { 
                        return e._id === recommendationArray[randomIndex]._id; 
                    });
                }
            }
            
            return recommendationResults;
        } catch (e) {
            return null;
        };
    }, 
});