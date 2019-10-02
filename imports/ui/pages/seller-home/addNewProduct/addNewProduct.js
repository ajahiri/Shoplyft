import './addNewProduct.html';

Template.addNewProduct.onRendered(function() {
  $('input#input_text, textarea#item_description').characterCounter();
});

Template.addNewProduct.events({
  'submit #addProductForm'(event) {
    //Prevent default browser form submission
    event.preventDefault();

    //Get data from DOM
    const target = event.target;
    const productName = target.item_name.value;
    const imageURL = target.imageLink.value;
    const stock = target.item_stock.value;
    const price = target.item_price.value;
    const description = target.item_description.value;
    const promotionalBool = $('#promoCheck').is(':checked');

    //Call method to add new product
    Meteor.call('addNewProduct.addProduct', {
      name: productName,
      imageLink: imageURL,
      stock: stock,
      price: price,
      description: description,
      promoBool: promotionalBool
    }, (err, res) => {
      if (err) {
        M.toast({html: 'Unable to add new Product. Error: ' + err.reason});
      } else {
        //success
        target.reset();
        M.toast({html: 'Added product ' + productName + '.'});
      }
    });
  }
});
