import './login.html';

//Import the components of the login page
import '../../components/login_form/login_form.js';
import '../../components/welcome_promo_text/welcome_promo_text.js';

Template.App_login.onRendered(function() {
    $('html,body').scrollTop(0);
});
