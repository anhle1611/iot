"use strict";

const adminController = require("../../controllers/admin.controllers");
const { checkRole, authenticateToken } = require("../../middleware/auth");

module.exports = (Router) => {
  const router = Router();

  router
    .use("/admin", authenticateToken, checkRole(["ADMIN"]))
    .post("/admin/createUser", adminController.createUser)
    .post("/admin/createRoom", adminController.createRoom)
    .get("/admin/users", adminController.listUser)
    .get("/admin/mcus", adminController.listMcu)
    .get("/admin/rooms", adminController.listRoom)
    .get("/admin/room/:id", adminController.getRoom);

  return router;
};
