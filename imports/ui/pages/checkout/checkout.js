import './checkout.html';
import '../../components/dropdown/dropdown.js';

var isLoading = new ReactiveVar(false);

Template.billing_Info.onRendered(function() {
  $('html,body').scrollTop(0);
  M.updateTextFields();
});

Template.billing_Info.onCreated(function() {
  Meteor.subscribe('userData');
});

Template.billing_Info.helpers({
  isLoading() {
    return isLoading.get();
  },
  billing() {
    if (Meteor.user()) {
      if (Meteor.user().billingInfo) {
        let billing = Meteor.user().billingInfo;
        return billing;
      } else {
        var billing = {
          fullname: "",
          phone: "",
          street: "",
          city: "",
          state: "",
          country: "",
          zip: "",
        };
        return billing;
      }
    }
  },
});

Template.billing_Info.events({
  'submit #checkoutForm'(event, template) {
    event.preventDefault();
    const target = event.target;

    var cardValid=true;
    function isCardValid() {
      if (!(isNaN (target.cname.value))) {
        cardValid=false;
      }
      if ((isNaN (target.ccnum.value)) || target.ccnum.value.length > 19 || target.ccnum.value.length < 12) {
        cardValid=false;
      }
      if (isNaN (target.expmonth.value) || target.expmonth.value>12 || target.expmonth.value<1) {
        cardValid=false;
      }
      if (isNaN (target.expyear.value) || target.expyear.value<2019 || target.expyear.value>2050) {
        cardValid=false;
      }
      if (isNaN (target.cvv.value) || target.cvv.value<0) {
        cardValid=false;
      }
      return cardValid;
    }

   if(!(isCardValid())){
     M.toast({html: 'Invalid Card Details'});
     return; // This return exits the event as no pint in going ahead without valid card details
   }
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
    isLoading.set(true)
    if (target.rememberBilling.value) {
      Meteor.call('updateBilling', billingInfo, (error, result) => {
        if (error) {
          isLoading.set(false)
          M.toast({html: error.reason});
        }
      });
    } 
    Meteor.call('makePayment', billingInfo, creditCard, (error, result) => {
      if (error) {
        isLoading.set(false)
        M.toast({html: error.reason});
      } else {
        isLoading.set(false);
        M.toast({html: 'Order successful!'});
        FlowRouter.go('App.payment_success');
      }
    });
  }

});
