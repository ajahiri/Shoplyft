import './admin-home.html';

//Pages related to Admin page.
//Only import components related to pages in each respective page
// View Branches
import './view-branches/view-branches.js';
// Add Branches
import './addBranches/addBranches.js';
// View Customers
import './view-customers/view-customers.js';
// Add Sellers
import './add-seller/add-seller.js';

FlowRouter.route('/admin-home/view-branches', {
  name: 'App.admin-home.view-branches',
  action() {
    BlazeLayout.render('App_body', { main: 'viewBranches' });
  },
});

FlowRouter.route('/admin-home/addBranches', {
  name: 'App.admin-home.addBranches',
  action() {
    BlazeLayout.render('App_body', { main: 'addBranches' });
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
