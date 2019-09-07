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
  productsinBranch() {
    if (viewingBranch.get() == 'promotional') {
      return;
    } else {
      if (productSearch.get() == "") {
        return Branches.findOne({_id: viewingBranch.get()}).products;
      } else {
        return FoundProducts.findOne({}).productsFound;
      }
    }
  },
});

Template.productItem.helpers({
  name() {
    if (productSearch.get() == "") {
      return name;
    } else {
      return this.name;
    }
  }
})

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
