'use strict';

const userController = require('../../controllers/auth.controllers');

module.exports = (Router) => {
  const router = Router();
  router.route('/login')
    .post(userController.login);
  return router;
};

