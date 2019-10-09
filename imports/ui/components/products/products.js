import './products.html';
import { Branches } from '../../../api/branches/branches.js';
import { Products } from '../../../api/branches/branches.js';

const viewingBranch = new ReactiveVar('promotional');
const productSearch = new ReactiveVar("");

Template.dropdown.onCreated(function() {
    Meteor.subscribe('productList');
    Meteor.subscribe('userData'); //Needed to know cart contents
});

Template.dropdown.events({
  'keyup #productSearch'(event, template) {
    //Prevent default browser form submission
    event.preventDefault();
    //Get our data values from the DOM
    var searchVal = template.$("#productSearch").val();
    if(searchVal.length == 0) {
      productSearch.set("");
      //This if statement fixes a bug where if admin backspaces to empty string
      //it will show nothing. This makes sure it resets name reactiveVar.
    } else if(searchVal) {
      productSearch.set(searchVal);
    }
  }
});

Template.dropdown.events({
  'change #branchSelector'(event) {
    event.preventDefault();

    const target = event.target;
    viewingBranch.set(target.value);
  }
});

Template.productItem.onRendered(function() {
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems);
});

Template.productItem.helpers({
  outofStock() {
    if (this.stock <= 0) {
      return true;
    }
  }
});

Template.productItem.events({
  'click #addtoCartButton' (event, template) {
    event.preventDefault();
    //console.log(template.data);
    Meteor.call('shoppingCart.addCartItem', {
      prodId: template.data._id,
      qty: 1,
    });
    M.toast({html: 'Item added to cart'});
  }
});

Template.products.onCreated(function() {
  viewingBranch.set('promotional');
  Meteor.subscribe('userCart');
});

Template.products.helpers({
  products() {
    if (viewingBranch.get() == 'promotional') {
      if (productSearch.get() != ""){
          return Products.find({
            promotional: true,
            name: { $regex: productSearch.get() }
          });
      } else {
          return Products.find({promotional: true});
      }
    }
    else if (productSearch.get() != "") {
      //return FoundProducts.findOne({}).productsFound;
      //username: { $regex: username.get() },
      return Products.find({
        branch: viewingBranch.get(),
        name: { $regex: productSearch.get() }
      });
      //console.log(productsToSearch);
    }
    else {
      return Products.find({branch: viewingBranch.get()});
    }
  },
});
