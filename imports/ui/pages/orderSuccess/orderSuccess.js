import './orderSuccess.html';
import '../../components/products/products.js';
import { Products } from '../../../api/branches/branches.js';

Template.recommendation.onCreated(function() {
  Meteor.subscribe('productList');
});

Template.recommendation.helpers({
    recommendation(){
    return  Products.find({category:'Monitors'}, {skip: 0, limit: 4});
    //just recommending laptop name products
    //recommending max 4 products
    //name to be swapped with category
   }
});
