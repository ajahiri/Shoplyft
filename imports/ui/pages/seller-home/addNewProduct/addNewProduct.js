import './addNewProduct.html';
import { Template }    from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { FilesCollection } from 'meteor/ostrio:files';
import { Images } from '../../../../api/imageStore/imageStore.js';

var imageID;
var uploadStatus = new ReactiveVar(false);

Template.previewImage.onRendered(function() {
  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems);
});

Template.previewImage.helpers({
  uploadPreview() {
    if (imageID && uploadStatus.get()) {
      try {
        return Images.findOne({_id: imageID}).link();
      } catch (e) {
        return;
      }
    } else {
      return;
    }
  }
});

Template.uploadForm.onCreated(function() {
  Meteor.subscribe('files.images.all');
});

Template.addNewProduct.onRendered(function() {
  $('input#input_text, textarea#item_description').characterCounter();
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

Template.addNewProduct.helpers({
  uploadStatus() {
    return uploadStatus.get();
  },
});

Template.addNewProduct.events({
  'submit #addProductForm'(event) {
    //Prevent default browser form submission
    event.preventDefault();

    //Get data from DOM
    const target = event.target;
    const productName = target.item_name.value;
    const stock = target.item_stock.value;
    const price = target.item_price.value;
    const category = target.categorySelector.value;
    const description = target.item_description.value;
    const promotionalBool = $('#promoCheck').is(':checked');
    try {
      //Check if file has been uploaded
    if (!imageID) {
      throw new Meteor.Error('No image.', 'No image has been uplaoded for this product.');
    } else if (!productName) {
      throw new Meteor.Error('Logic error.', 'Invalid product name.');
    } else if (stock <= 0) {
      throw new Meteor.Error('Logic error.', 'Invalid stock amount.');
    } else if (description.length > 1000) {
      throw new Meteor.Error('Logic error.', 'Description is too long.');
    } else if (!category) {
      throw new Meteor.Error('Logic error.', 'No category selected.');
    } else if (!price || price == 0) {
      throw new Meteor.Error('Logic error.', 'Invalid price.');
    } else {
      //Call method to add new product
      Meteor.call('addNewProduct.addProduct', {
        name: productName,
        imageLink: Images.findOne({_id: imageID}).link(),
        imageID: imageID,
        stock: stock,
        price: price,
        category: category,
        description: description,
        promoBool: promotionalBool
      }, (err, res) => {
        if (err) {
          M.toast({html: 'Unable to add new Product. ' + err.reason});
        } else {
          //success
          target.reset();
          M.toast({html: 'Added product ' + productName + '.'});
          uploadStatus.set(false);
          imageID = null;
        }
      });
    }
    } catch(e) {
      M.toast({html: e});
    }
    
  }
});

Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});

Template.uploadForm.helpers({
  currentUpload() {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadForm.events({
  'change #fileInput'(e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // multiple files were selected
      const upload = Images.insert({
        file: e.currentTarget.files[0],
        streams: 'dynamic',
        chunkSize: 'dynamic'
      }, false);

      upload.on('start', function () {
        template.currentUpload.set(this);
      });

      upload.on('end', function (error, fileObj) {
        if (error) {
          M.toast({html: 'Error during upload: ' + error});
        } else {
          M.toast({html:'File "' + fileObj.name + '" successfully uploaded'});
          //console.log(fileObj);
          imageID = fileObj._id;
          uploadStatus.set(true);
        }
        template.currentUpload.set(false);
      });

      upload.start();
    }
  }
});
