"use strict";

const userController = require("../../controllers/user.controllers");
const { authenticateToken } = require("../../middleware/auth");

module.exports = (Router) => {
  const router = Router();

  router
    .use("/admin", authenticateToken)
    .get("/user/my-room", userController.myRoom);

  return router;
};