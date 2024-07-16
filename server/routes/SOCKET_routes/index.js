"use strict";

const io = require("socket.io")();
const config = require("../../config");
const eventHandlers = require("./eventHandlers");
const jwt = require("jsonwebtoken");
const { User, Room, Mcu, McuSetting, McuLog } = require("../../models");

var activeUsers = {};
var activeMcus = {};
io.on("connection", async (socket) => {

  const uPromise = User.findOne({
    where: { socketId: socket.id },
    include: [
      {
        model: Room,
        as: "room",
      },
      {
        model: Role,
        as: "role",
      }
    ],
  });
  const mcuPromise = Mcu.findOne({
    where: { socketId: socket.id },
    include: {
      model: Room,
      as: "room",
    },
  });

  const [u, m] = await Promise.all([uPromise, mcuPromise]);

  if (u) {
    activeUsers[socket.id] = u;
  } else if (m) {
    activeMcus[socket.id] = m;
  }

  io.emit("/socketActive", { activeUsers, activeMcus });

  // Khi user emit event userJoinRoom sẽ update socketId cho user và cho user join room
  socket.on("/userJoinRoom", async ({ token, roomId }) => {
    const room = await Room.findOne({ where: { id: roomId } });

    if (!room) return;

    jwt.verify(token, config.jwt.secret, async (err, { user }) => {
      if (err) return;

      if (user) {
        await User.update(
          {
            roomId: room.id,
            socketId: socket.id,
          },
          {
            where: { id: user.id },
          }
        );

        socket.join(room.code);
      }
    });
  });

  // Khi mcu emit event connect thì sẽ khởi tạo mcu với code được truyền lên (code định danh cho 1 mcu)
  // sau đó gửi event cho admin báo đã có 1 mcu mới connect
  // sau đó gửi event cho admin báo đã có 1 mcu mới connect
  socket.on("/mcuConnect", async ({ code }) => {
    const mcu = await Mcu.create({
      code,
    });

    socket.broadcast.emit("/mcuConnect", { mcu });
    io.to(socket.id).emit("/mcuConnectSuccess", { mcu });
  });

  // Yêu cầu mcu join room
  socket.on("/adminSetMCURoom", async ({ code, roomId }) => {
    socket.emit("/setMCURoom", { code, roomId });
  });

  // MCU join 1 room theo yêu cầu
  socket.on("/mcuJoinRoom", async ({ code, roomId }) => {
    const room = await Room.findOne({ where: { id: roomId } });
    if (!room) return;

    const mcu = await Mcu.update(
      {
        roomId: room.id,
        socketId: socket.id,
      },
      {
        where: { code },
      }
    );

    socket.join(room.code);
    socket.broadcast.to(room.code).emit("/mcuJoinRoomSuccess", { mcu });
  });

  // gửi config đến 1 mcu
  socket.on("/configMcu", async ({ configs, mcuId }) => {
    const mcu = await Mcu.findOne({
      where: { id: mcuId },
      include: {
        model: Room,
        as: "room",
      },
    });

    io.to(u.room.code).emit("/configMCU", { code: mcu.code, configs });
  });

  // Mcu gửi event khi update config thành công
  socket.on("/configMCUSuccess", async ({ code, configs }) => {
    const mcu = await Mcu.findOne({
      where: {
        code,
        configs,
      },
      include: {
        model: Room,
        as: "room",
      },
    });

    const mcuSetting = await McuSetting.create({
      mcuId: mcu.id,
      configs,
    });

    io.to(mcu.room.code).emit("/configMCUSuccess", { mcuSetting });
  });

  // Mcu gửi state đến user
  socket.on("/mcuUpdateState", async ({ code, data }) => {
    const mcu = await Mcu.findOne({
      where: {
        code,
        configs,
      },
      include: {
        model: Room,
        as: "room",
      },
    });

    const mcuLog = await McuLog.create({
      mcuId: mcu.id,
      data,
    });

    io.to(mcu.room.code).emit("/configMCUSuccess", { mcuLog });
  });

  // Ngắt kết rối
  socket.on("disconnect", async () => {
    const uPromise = User.findOne({
      where: { socketId: socket.id },
      include: {
        model: Room,
        as: "room",
      },
    });
    const mcuPromise = Mcu.findOne({
      where: { socketId: socket.id },
      include: {
        model: Room,
        as: "room",
      },
    });
  
    const [user, mcu] = await Promise.all([uPromise, mcuPromise]);

    if (user) {
      io.to(user.room.code).emit("/socketDisconnect", { type: "user", object: u });
      delete activeUsers[socket.id]
    } else if (mcu) {
      io.to(mcu.room.code).emit("/socketDisconnect", {
        type: "mcu",
        object: mcu,
      });
      delete activeMcus[socket.id]
    }

    io.emit("/socketActive", { activeUsers, activeMcus })
  });
});

module.exports = io;
