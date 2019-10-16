import './add-seller.html';
import '../../../components/userPromoteEntry/userPromoteEntry.js';

Template.addSeller.onCreated(function() {
  Meteor.subscribe('userList');
  Meteor.subscribe('branchesAdmin');
});

Template.addSeller.onRendered(function() {
  $('html,body').scrollTop(0);
});

var username = new ReactiveVar();//Initialize the search parameter

Template.addSeller.helpers({
  usersFound() {
    if (username.get() == null) {
      return Meteor.users.find({});
    } else {
      return Meteor.users.find({
        username: { $regex: username.get(), $options: 'i' },
      });
    }
  }
});

Template.addSeller.events({
  'keyup #username'(event, template) {
    //Prevent default browser form submission
    event.preventDefault();

    //Get our data values from the DOM
    var searchVal = template.$("#username").val();
    if(searchVal.length == 0) {
      username.set("");
      //This if statement fixes a bug where if admin backspaces to empty string
      //it will show nothing. This makes sure it resets username reactiveVar.
    }
    if(searchVal) {
      username.set(searchVal);
    }
  }
});
