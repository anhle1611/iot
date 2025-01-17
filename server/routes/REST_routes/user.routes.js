"use strict";

const userController = require("../../controllers/user.controllers");
const { authenticateToken } = require("../../middleware/auth");

module.exports = (Router) => {
  const router = Router();

  router
    .use("/user", authenticateToken)
    .get("/user/my-room", userController.myRoom)
    .get("/user/my-room-detail", userController.myRoomInfo);
  return router;
};
