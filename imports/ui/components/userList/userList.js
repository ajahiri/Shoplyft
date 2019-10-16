import './userList.html';
import { Branches } from '../../../api/branches/branches.js';

Template.completeUserList.helpers({
  role() {
    if (this.roles) {
      return this.roles;
    }
  },
  branch() {
    if (this.allocatedBranch) {
      return Branches.findOne({_id: this.allocatedBranch}).name;
    } else {
      return 'Unassigned';
    }
  },
  createdAtDate() {
    var date = this.createdAt;
    return moment(date).format("DD-MM-YYYY");
  }
});

Template.completeUserList.events({
  'click #deleteUser'(event, template) {
    console.log(template.data);
    
    //Meteor.call('deleteUser',)
  },
});
