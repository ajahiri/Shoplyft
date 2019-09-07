import './products.html';
import { Branches } from '../../../api/branches/branches.js';

const viewingBranch = new ReactiveVar('promotional');
const productSearch = new ReactiveVar("");
const FoundProducts = new Mongo.Collection('FoundProducts');

var prodSub;

Template.dropdown.onCreated(function() {
    //Meteor.subscribe('branchesList');
});

Template.products.onRendered(function() {
  viewingBranch.set('promotional');
});

Template.products.helpers({
  products() {
    if (viewingBranch.get() == 'promotional') {
      return;
    }
    else if (productSearch.get() != "") {
      //return FoundProducts.findOne({}).productsFound;
      var productsToSearch = Branches.findOne({_id: viewingBranch.get()}).products;
      //console.log(productsToSearch);
      var searchParam = productSearch.get().toLowerCase();
      var productsFound = [];
      productsToSearch.forEach(x => {if (x.name.toLowerCase().includes(searchParam)) productsFound.push(x) });
      //console.log(productsFound);
      return productsFound;
    }
    else {
      return Branches.findOne({_id: viewingBranch.get()}).products;
    }
  },
});

Template.dropdown.events({
  'keyup #productSearch'(event, template) {
    //Prevent default browser form submission
    event.preventDefault();
    if (prodSub) {
        prodSub.stop();
    }
    //Get our data values from the DOM
    var searchVal = template.$("#productSearch").val();
    if(searchVal.length == 0) {
      productSearch.set("");
      //This if statement fixes a bug where if admin backspaces to empty string
      //it will show nothing. This makes sure it resets username reactiveVar.
    }
    else if(searchVal) {
      productSearch.set(searchVal);
      prodSub = Meteor.subscribe('searchProducts', productSearch.get(), viewingBranch.get());
    }
  }
});

Template.dropdown.events({
  'change #branchSelector'(event) {
    event.preventDefault();

    const target = event.target;
    viewingBranch.set(target.value);
    if (prodSub) {
        prodSub.stop();
    }
    prodSub = Meteor.subscribe('searchProducts', productSearch.get(), viewingBranch.get());
  }
})
