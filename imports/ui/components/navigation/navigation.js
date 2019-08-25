import './navigation.html';

Template.navigation.onRendered(function() {
  //Below line is a fix for bug where the shadow-overlay remains when nav to different page. -Arian
  $('.sidenav-overlay').css({"display": "none","opacity": "0"});
  $('.sidenav').sidenav();
});
