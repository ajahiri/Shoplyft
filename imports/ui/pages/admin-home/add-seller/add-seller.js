import './add-seller.html';
import '../../../components/userTableEntry/userTableEntry.js';

var username = new ReactiveVar();//Initialize the search parameter

Template.addSeller.onCreated(function() {
  Meteor.subscribe('userList');
});

Template.addSeller.helpers({
  usersFound() {
    return Meteor.users.find({
      username: username.get(),
    });
  }
});

Template.addSeller.events({
  'keyup #username'(event, template) {
    //Prevent default browser form submission
    event.preventDefault();

    //Get our data values from the DOM
    username.set(template.$("#username").val());
  }
});

Template.userTableEntry.events({
  'click #promote'(event) {
    console.log(this._id);
    var selectedUserID = this._id;
    Meteor.call('userTableEntry.promoteUser', {
      userId: selectedUserID,
    }, (err, res) => {
      if (err) {
        console.log("unable to run promoteuser");
      } else {
        //success
        console.log("success!");
      }
    });
  },
  'click #demote'(event) {
    console.log(this._id);
    var selectedUserID = this._id;
    Meteor.call('userTableEntry.demoteUser', {
      userId: selectedUserID,
    }, (err, res) => {
      if (err) {
        console.log("unable to run promoteuser");
      } else {
        //success
        console.log("success!");
      }
    });
  }
});

Template.userTableEntry.helpers({
  role() {
    if (this.roles) {
      return this.roles[0];
    } else {
      return 'None/Customer';
    }
  },
  branch() {
    if (this.branch) {
      return this.branch;
    } else {
      return 'Unassigned';
    }
  }
});
