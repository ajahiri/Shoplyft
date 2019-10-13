import { Images } from '../imageStore.js';

Meteor.publish('files.images.all', function () {
  return Images.find().cursor;
});
