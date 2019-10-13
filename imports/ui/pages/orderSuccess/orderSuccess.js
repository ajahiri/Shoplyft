import './orderSuccess.html';
import '../../components/products/products.js';
import { Products } from '../../../api/branches/branches.js';

Template.recommendation.helpers({
    recommendation(){
    return  Products.find({name:'laptop'}, {skip: 0, limit: 2});
    return  Products.find({name:'keyboard'}, {skip: 0, limit: 2});
    //just recommending laptop name products
    //recommending max 4 products
    //name to be swapped with category
   }
});
