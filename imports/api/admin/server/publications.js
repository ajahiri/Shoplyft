//import { Branches } from '../../collections/Branches.js';

Meteor.publish('userList', function() {
  if (!this.userId) {
    return this.ready();
  }
  if (Roles.userIsInRole(this.userId, 'admin')) {
    return Meteor.users.find({}, {
      //Fields to publish, needs to be limited due to security reasons
      //Admins should not have access to user passwords
      fields: {
        _id: 1,
        username: 1,
        roles: 1,
        emails: 1,
        createdAt: 1,
      }
    });
  } else {
    return this.ready();
  }
});
