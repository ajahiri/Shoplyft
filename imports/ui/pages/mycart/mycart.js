import './mycart.html';
import '../../components/cart/cart_products.js';

Template.App_MyCart.onRendered(function() {
    $('html,body').scrollTop(0);
});
