import './seller-home.html';
// Transaction History
import './view-transactions/view-transaction.js';
//Add New products
import './addNewProduct/addNewProduct.js';
//Sales salesReports
import './salesReports/salesReports.js';

Template.App_sellerHome.onRendered(function() {
  $('html,body').scrollTop(0);
});

FlowRouter.route('/seller-home/add-new-product', {
  name: 'App.seller-home.add-new-product',
  action() {
    BlazeLayout.render('App_body', { main: 'addNewProduct' });
  },
});

FlowRouter.route('/seller-home/view-transactions', {
  name: 'App.seller-home.view-transactions',
  action() {
    BlazeLayout.render('App_body', { main: 'sellerTransactions' });
  },
});

FlowRouter.route('/seller/sales-report/:saleTime', {
  name: 'Sales.report',
  action(params, queryParams) {
    BlazeLayout.render('App_body', { main: 'salesReports' });
  }
});
