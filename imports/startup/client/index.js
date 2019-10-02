// Import client startup through a single index entry point
import {materialize} from 'materialize-css';

Meteor.startup(function() {
    reCAPTCHA.config({
        sitekey: '6LemTbsUAAAAANkkAlCBRQg_NjywnMPe0M4j_DSB', //REQUIRED
        theme: 'light', //OPTIONAL. <light|dark> Specifies the color theme of the widget
        type: 'image', //OPTIONAL. <audio|image> Specifies the type of captcha to serve
        size: 'normal', //OPTIONAL. <normal|compact> Specifies the type of captcha to serve
        callback: function(val) {}, //OPTIONAL. The name of your callback function to be executed when the user submits a successful CAPTCHA response. The user's response, g-recaptcha-response, will be the input for your callback function.
        tabindex: 0, //OPTIONAL. The tabindex of the widget and challenge. If other elements in your page use tabindex, it should be set to make user navigation easier.
        "expired-callback": function() {} //OPTIONAL. The name of your callback function to be executed when the recaptcha response expires and the user needs to solve a new CAPTCHA.
    });
});

import './routes.js';
