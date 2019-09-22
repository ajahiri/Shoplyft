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


//Product page list view
import '../../ui/pages/product_list/product_list.js';

//mycart page
import '../../ui/pages/mycart/mycart.js';

//checkout page
import '../../ui/pages/checkout/checkout.js';

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
};

//Routes added by Lucky, need to double check. 
//Resolved conflict for now
FlowRouter.route('/product_listview', {
  name: 'product_listview',
  action() {
    BlazeLayout.render('product_listview');
  },
});

FlowRouter.route('/mycart', {
  name: 'mycart',
  action() {
    BlazeLayout.render('mycart');
  },
});

FlowRouter.route('/checkout', {
  name: 'checkout',
  action() {
    BlazeLayout.render('checkout');
  },
});
