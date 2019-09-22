import './seller-home.html';
// Transaction History
import './view-transactions/view-transaction.js';
// Update Stock
import './update-stock/update-stock.js';
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
    BlazeLayout.render('App_body', { main: 'App_sellerHome_view-transactions' });
  },
});

FlowRouter.route('/seller-home/update-stock', {
  name: 'App.seller-home.update-stock',
  action() {
    BlazeLayout.render('App_body', { main: 'App_sellerHome_update-stock' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
