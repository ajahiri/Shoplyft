import './home.html';
import '../../components/dropdown/dropdown.js';
import '../../components/products/products.js';
import '../../components/footer/footer.js';

Template.App_home.onRendered(function() {
    $('html,body').scrollTop(0);
});
