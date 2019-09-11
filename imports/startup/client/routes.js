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
<<<<<<< HEAD
// View Branches
import '../../ui/pages/admin-home/view-branches/view-branches.js';
// Add/Delete Products
import '../../ui/pages/admin-home/Add-Del-Products/Add-Del-Products.js';
// View Customers
import '../../ui/pages/admin-home/view-customers/view-customers.js';
// Add Sellers
import '../../ui/pages/admin-home/add-seller/add-seller.js';

// Seller Homepage
import '../../ui/pages/seller-home/seller-home.js';
// Transaction History
import '../../ui/pages/seller-home/view-transactions/view-transaction.js';
// Update Stock
import '../../ui/pages/seller-home/update-stock/update-stock.js';
// Add/Delete Products
import '../../ui/pages/seller-home/Add-Del-Products/Add-Del-Products.js';
=======
//All admin functions should be imported in the admin-home.js

// Seller Homepage
import '../../ui/pages/seller-home/seller-home.js';
//All seller functions should be imported in the seller-home.js
>>>>>>> master


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

<<<<<<< HEAD
FlowRouter.route('/admin-home/view-branches', {
  name: 'App.admin-home.view-branches',
  action() {
    BlazeLayout.render('App_body', { main: 'App_adminHome_view-branches' });
  },
});

FlowRouter.route('/admin-home/Add-Del-Products', {
  name: 'App.admin-home.Add-Del-Products',
  action() {
    BlazeLayout.render('App_body', { main: 'App_adminHome_Add-Del-Products' });
  },
});

FlowRouter.route('/admin-home/view-customers', {
  name: 'App.admin-home.view-customers',
  action() {
    BlazeLayout.render('App_body', { main: 'viewCustomers' });
  },
});

FlowRouter.route('/admin-home/add-seller', {
  name: 'App.admin-home.add-seller',
  action() {
    BlazeLayout.render('App_body', { main: 'addSeller' });
  },
});


=======
//Respective routes for seller pages are in seller-home js
>>>>>>> master
FlowRouter.route('/seller-home', {
  name: 'App.seller-home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_sellerHome' });
  },
});
<<<<<<< HEAD

FlowRouter.route('/seller-home/view-transactions', {
  name: 'App.seller-home.view-transactions',
  action() {
    BlazeLayout.render('App_body', { main: 'App_sellerHome_view-transactions' });
  },
});

FlowRouter.route('/seller-home/update-stock', {
  name: 'App.seller-home.update-stock',
  action() {
    BlazeLayout.render('App_body', { main: 'App_sellerHome_update-stock' });
  },
});

FlowRouter.route('/seller-home/Add-Del-Products', {
  name: 'App.seller-home.Add-Del-Products',
  action() {
    BlazeLayout.render('App_body', { main: 'App_sellerHome_Add-Del-Products' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
=======
>>>>>>> master
