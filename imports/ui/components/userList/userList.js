import './userList.html';

Template.completeUserList.helpers({
  role() {
    if (this.roles) {
      return this.roles;
    }
  },
  branch() {
    if (this.branch) {
      return this.branch;
    } else {
      return 'Unassigned';
    }
  },
  createdAtDate() {
    var date = this.createdAt;
    return moment(date).format("DD-MM-YYYY");
  }
});
