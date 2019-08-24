import './dropdown.html';

Template.navigation.onRendered(function() {
  $('select').formSelect();
});
