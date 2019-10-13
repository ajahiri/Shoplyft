import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Roles } from 'meteor/alanning:roles';

//Global UI Components
import '../../ui/components/navigation/navigation.js';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Login/Signup
import '../../ui/pages/login/login.js';
import '../../ui/pages/signup/signup.js';

// Admin Homepage
import '../../ui/pages/admin-home/admin-home.js';
//All admin functions should be imported in the admin-home.js

// Seller Homepage
import '../../ui/pages/seller-home/seller-home.js';
//All seller functions should be imported in the seller-home.js

// MyAccount
import '../../ui/pages/MyAccount/MyAccount.js';

// Reset Password Page
import '../../ui/pages/resetPassword/resetPassword.js';

//mycart page
import '../../ui/pages/mycart/mycart.js';

//checkout page
import '../../ui/pages/checkout/checkout.js';

//productDetail page
import '../../ui/components/product_detailview/product_detailview.js';

//orderDetail page
import '../../ui/components/order_detailview/order_detailview.js';

//PaymentSuccess page
import '../../ui/pages/orderSuccess/orderSuccess.js';

//Website Credits page
import '../../ui/pages/websiteCredits/websiteCredits.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/login', {
  name: 'App.login',
  action() {
    BlazeLayout.render('App_body', { main: 'App_login' });
  },
});

FlowRouter.route('/signup', {
  name: 'App.signup',
  action() {
    BlazeLayout.render('App_body', { main: 'App_signup' });
  },
});

FlowRouter.route('/credits', {
  name: 'App.credits',
  action() {
    BlazeLayout.render('App_body', { main: 'App_credits' });
  },
});

//Respective routes for admin pages are in admin-home js
FlowRouter.route('/admin-home', {
  name: 'App.admin-home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_adminHome' });
  },
});

//Respective routes for seller pages are in seller-home js
FlowRouter.route('/seller-home', {
  name: 'App.seller-home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_sellerHome' });
  },
});

FlowRouter.route('/MyAccount', {
  name: 'App.MyAccount',
  action() {
    BlazeLayout.render('App_body', { main: 'App_MyAccount' });
  },
});

FlowRouter.route('/mycart', {
  name: 'App.mycart',
  action() {
    BlazeLayout.render('App_body', { main: 'App_MyCart' });
  },
});

FlowRouter.route('/checkout', {
  name: 'App.checkout',
  action() {
    BlazeLayout.render('App_body', { main: 'App_Checkout' });
  },
});

FlowRouter.route('/products/:_id', {
  name: 'Product.detail',
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'product_detailview' });
  }
});

FlowRouter.route('/orders/:_id', {
  name: 'Order.detail',
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'order_detailview' });
  }
});

FlowRouter.route('/orderSuccess', {
  name: 'App.payment_success',
  action() {
    BlazeLayout.render('App_body', { main: 'orderSuccess' });
  },

});
