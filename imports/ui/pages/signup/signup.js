import './signup.html';

//Import the comoponents of the signup page
import '../../components/signup_form/signup_form.js';
import '../../components/welcome_promo_text/welcome_promo_text.js';

Template.App_signup.onRendered(function() {
    $('html,body').scrollTop(0);
});
