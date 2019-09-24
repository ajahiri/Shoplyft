import './MyAccount.html';
import { Meteor } from 'meteor/meteor';
import '../../components/userList/userList.js';

Template.App_MyAccount.helpers({
    getUsername() {
        return Meteor.user().username;
    }
});

Template.App_MyAccount.helpers({
    getEmail() {
        return Meteor.user().emails[0].address;
    }
});

Template.App_MyAccount.helpers({
    verified() {
        return Meteor.user().emails[0].verified;
    }
});

Template.App_MyAccount.helpers({
    getId() {
        return Meteor.user()._id;
    }
});