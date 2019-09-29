import './checkout.html';

import '../../components/product_page_navigation/product_page_navigation.js';
import '../../components/branch_dropdown/branch_dropdown.js';

if (Meteor.isClient) {
  Template.checkout.events({
    'click #buy_now': function(e){
     console.log("You pressed the button");
     FlowRouter.go('payment_confirm');
   }
});
}
