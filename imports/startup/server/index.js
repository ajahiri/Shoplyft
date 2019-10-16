// Import server startup through a single index entry point
import { Roles } from 'meteor/alanning:roles'
/*
Roles.addUsersToRoles('bvnofMHzLNSsKHTKZ', 'admin');
Roles.addUsersToRoles('KoHHr9kRfrBbp4Seg', 'admin');
Roles.addUsersToRoles('E5f45n284Aqr8ddy7', 'admin');
Roles.addUsersToRoles('up5fytyofupf2nwEL', 'admin');
*/
Meteor.startup(function() {
  Accounts.config({sendVerificationEmail: true});
  process.env.MAIL_URL = 'smtp://apikey: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@smtp.sendgrid.net:587';

  Accounts.emailTemplates.siteName = 'Shoplyft';
  Accounts.emailTemplates.from = 'ShopLyft <no-reply@shoplyft.me>';

  Accounts.emailTemplates.enrollAccount.subject = (user) => {
    return `Welcome to ShopLyft.me, ${user.username}`;
  };

  Accounts.emailTemplates.enrollAccount.text = (user, url) => {
    return 'You have been selected to participate in building a better future!'
      + ' To activate your account, simply click the link below:\n\n'
      + url;
  };

  Accounts.emailTemplates.resetPassword.from = () => {
    // Overrides the value set in `Accounts.emailTemplates.from` when resetting
    // passwords.
    return 'ShopLyft.me Password Reset <no-reply@shoplyft.me>';
  };
  Accounts.emailTemplates.verifyEmail = {
     subject() {
        return "Activate your ShopLyft account now!";
     },
     text(user, url) {
        return `Hey ${user.username}! Verify your e-mail by following this link: ${url}`;
     }
  };

});

// Ensuring every user has an email address, should be in server-side code
Accounts.validateNewUser((user) => {
  new SimpleSchema({
    _id: { type: String },
    username: { type: String },
    emails: { type: Array },
    'emails.$': { type: Object },
    'emails.$.address': { type: String },
    'emails.$.verified': { type: Boolean },
    createdAt: { type: Date },
    services: { type: Object, blackbox: true }
  }).validate(user);

  // Return true to allow user creation to proceed
  return true;
});

import './fixtures.js';
import './register-api.js';
