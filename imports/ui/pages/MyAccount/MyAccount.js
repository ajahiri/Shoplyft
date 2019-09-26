import './MyAccount.html';
import { Meteor } from 'meteor/meteor';
import '../../components/userList/userList.js';

Template.App_MyAccount.helpers({
    getUsername() {
        return Meteor.user().username;
    },
    getEmail() {
        return Meteor.user().emails[0].address;
    },
    verified() {
        return Meteor.user().emails[0].verified;
    },
    getRoles() {
        if (Meteor.user().roles) {
            return Meteor.user().roles;
        }
    },
    getId() {
        return Meteor.user()._id;
    },
    getBranch() {
            return Branches.findOne({_id: Meteor.user().allocatedBranch}.name);
    },
    hasBranch() {
        if (Branches.findOne({_id: Meteor.user().allocatedBranch}.name)) {
            return true;
        }   
    }
});