'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/RecognizeImg')
    .post(todoList.get_image);

};
