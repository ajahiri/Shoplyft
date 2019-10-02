import './addBranches.html';

Template.addBranches.onCreated(function() {
  Meteor.subscribe('userList');
});

Template.addBranches.helpers({
  sellersFound() {
    return Meteor.users.find({
      roles: "seller",
    });
  }
});
Template.sellerDropOption.helpers({
  sellerName() {
    return this.username;
  },
  sellerID() {
    return this._id;
  }
})

Template.addBranches.events({
  'submit #addBranchForm'(event) {
    //Prevent default browser form submission
    event.preventDefault();

    //Get data from DOM
    const target = event.target;
    const branchName = target.branch_name.value;
    const phoneNumber = target.phone_number.value;
    const contactEmail = target.contact_email.value;
    const unitNumber = target.unit_number.value.toString();
    const streetNumber = target.street_number.value;
    const streetName = target.street_name.value;
    const city = target.city.value;
    const postCode = parseInt(target.postCode.value);
    const sellerID = target.sellerSelector.value;

    //Call Method to add Branch --> Error Handling might be added later
    Meteor.call('addBranches.addNewBranch', {
      branchName: branchName,
      phoneNumber: phoneNumber,
      contactEmail: contactEmail,
      unitNumber: unitNumber,
      streetNumber: streetNumber,
      streetName: streetName,
      city: city,
      postCode: postCode,
      seller: sellerID
    }, (err, res) => {
      if (err) {
        M.toast({html: 'Unable to add new Branch. Error: ' + err.reason});
      } else {
        //success
        target.reset();
        M.toast({html: 'Added branch ' + branchName + '.'});
      }
    });
  }
});
