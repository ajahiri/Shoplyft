import './seller-home.html';
// Transaction History
import './view-transactions/view-transaction.js';
//Add New products
import './addNewProduct/addNewProduct.js';

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
