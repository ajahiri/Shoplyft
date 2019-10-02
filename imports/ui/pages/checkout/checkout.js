import './checkout.html';
import '../../components/dropdown/dropdown.js';

Template.billing_Info.helpers({

});

Template.billing_Info.events({
  'submit #checkoutForm'(event, template) {
    event.preventDefault();
    const target = event.target;

    var billingInfo = {
      fullName: target.fname.value,
      phone: target.phone.value,
      street: target.street.value,
      city: target.city.value,
      state: target.state.value,
      country: target.country.value,
      zip: target.zip.value,
    }

    var creditCard = {
      cardName: target.cname.value,
      cardNumber: target.ccnum.value,
      expMonth: target.expmonth.value,
      expYear: target.expyear.value,
      cardCVV: target.cvv.value,
    }

    var purchaseItems = Meteor.user().cart;
    //console.log(purchaseItems);
    Meteor.call('makePayment', billingInfo, creditCard, (error, result) => {
      if (error) {
        M.toast({html: error.reason});
      } else {
        M.toast({html: 'Order successful!'});
        FlowRouter.go('App.payment_success');
      }
    });
  }
});
