import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

//Global UI Components
import '../../ui/components/navigation/navigation.js';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';

// Login/Signup
import '../../ui/pages/login/login.js';
import '../../ui/pages/signup/signup.js';

// Admin and Seller Homepage
import '../../ui/pages/admin-home/admin-home.js';
import '../../ui/pages/seller-home/seller-home.js';

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

FlowRouter.route('/admin-home', {
  name: 'App.admin-home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_adminHome' });
  },
});

FlowRouter.route('/seller-home', {
  name: 'App.seller-home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_sellerHome' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
