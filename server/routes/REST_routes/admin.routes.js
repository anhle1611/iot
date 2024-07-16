"use strict";

const adminController = require("../../controllers/admin.controllers");
const { checkRole, authenticateToken } = require("../../middleware/auth");

module.exports = (Router) => {
  const router = Router();

  router
    .use("/admin", authenticateToken, checkRole(["ADMIN"]))
    .post("/admin/createUser", adminController.createUser)
    .post("/admin/createRoom", adminController.createRoom)
    .get("/admin/rooms", adminController.listRoom)
    .get("/admin/room/:id", adminController.getRoom);

  return router;
};
