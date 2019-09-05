Meteor.methods({
  'addBranches.addNewBranch'({
    branchName,
    phoneNumber,
    contactEmail,
    unitNumber,
    streetNumber,
    streetName,
    city,
    postCode
  }) {
    if (Roles.userIsInRole(this.userId, 'admin')) {
      const address = {
        unitNo: unitNumber,
        street: streetName,
        streetNumber: streetNumber,
        city: city,
        postCode: postCode
      };
      const newBranch = {
        _id: Random.id(),
        name: branchName,
        email: contactEmail,
        phoneNumber: phoneNumber,
        address: address,
        createdAt: new Date(),
      }
      Branches.schema.validate(newBranch);
      Branches.insert(newBranch);
    } else {
      return new Error('Not authorised!');
    }
  }
});
