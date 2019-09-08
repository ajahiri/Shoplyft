import './navigation.html';

Template.navigation.onRendered(function() {
  //Below line is a fix for bug where the shadow-overlay remains when nav to different page. -Arian
  /*$('.sidenav-overlay').css({"display": "none","opacity": "0"});
  $('.sidenav').sidenav(elems, {
    preventScrolling: false,
  });*/
  $('.sidenav-overlay').css({"display": "none","opacity": "0"});
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {
    preventScrolling: false,
  });
});

Template.navigation.events({
  'click #logOutButton'(event) {
    Meteor.logout();
    M.toast({html: 'You have successfully logged out'});
  }
});
