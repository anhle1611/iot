"use strict";

const io = require("socket.io")();
const config = require("../../config");
const eventHandlers = require("./eventHandlers");
const jwt = require("jsonwebtoken");
const { User, Room, Mcu, McuSetting, McuLog } = require("../../models");

// const ioInit = async (io) => {
  var activeUsers = {};
  var activeMcus = {};
  io.on("connection", async (socket) => {
    console.log("connection", socket.id);

    socket.on("/userConnect", async ({ token }) => {
      console.log("/userConnect", { token });
      try {
        jwt.verify(token, config.jwt.secret, async (err, { user }) => {
          if (err) return;
    
          if (user) {
            const u = await User.findOne({ 
              where: { id: user.id },
              include: {
                model: Room,
                as: "room",
              }, 
            });
            u.set({
              socketId: socket.id
            })
            await u.save();
    
            if(u.room.code) {
              socket.join(u.room.code);
            }
    
            activeUsers[socket.id] = u;
            io.emit("/socketActive", { activeUsers, activeMcus });
          }
        });
      } catch (error) {
        console.log("/userConnect");
        console.log(error);
      }
    });

    //admin yêu cầu 1 user join room
    socket.on("/adminSetUserRoom", async ({ userId, roomId }) => {
      console.log("/adminSetUserRoom",{ userId, roomId });
      try {
        await User.update(
          {
            roomId,
          },
          {
            where: { id: user.id },
          }
        );
    
        io.emit("/adminSetUserRoom", { userId, roomId });
      } catch (error) {
        console.log("/adminSetUserRoom");
        console.log(error);
      }
    });

    // Khi user emit event userJoinRoom sẽ update socketId cho user và cho user join room
    socket.on("/userJoinRoom", async ({ token, roomId }) => {
      console.log("/userJoinRoom", { token, roomId });
      try {
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

            user = { ...user, socketId: socket.id, roomId: room.id};

            activeUsers[socket.id] = user;
            io.emit("/socketActive", { activeUsers, activeMcus });

            socket.join(room.code);
          }
        });
      } catch (error) {
        console.log("/userJoinRoom");
        console.log(error);
      }
    });

    // Khi mcu emit event connect thì sẽ khởi tạo mcu với code được truyền lên (code định danh cho 1 mcu)
    // sau đó gửi event cho admin báo đã có 1 mcu mới connect
    // sau đó gửi event cho admin báo đã có 1 mcu mới connect
    socket.on("/mcuConnect", async ({ code }) => {
      console.log("/mcuConnect", { code });
      try {
        let mcu = await Mcu.findOne({
          where: { code },
          include: {
            model: Room,
            as: "room",
          },
        });
        if(mcu) {
          mcu.set({
            socketId: socket.id
          })
          await mcu.save();
        } else {
          mcu = await Mcu.create({
            code,
            socketId: socket.id
          });
        }
    
        if(mcu.room && mcu.room.code) {
          socket.join(mcu.room.code);
        }
    
        socket.broadcast.emit("/mcuConnect", { mcu });
        io.to(socket.id).emit("/mcuConnectSuccess", { mcu });
    
        activeMcus[socket.id] = mcu;
        io.emit("/socketActive", { activeUsers, activeMcus });
      } catch (error) {
        console.log("/mcuConnect");
        console.log(error);
      }
    });

    // Yêu cầu mcu join room
    socket.on("/adminSetMCURoom", async ({ code, roomId }) => {
      console.log("/adminSetMCURoom", { code, roomId });
      try {
        await Mcu.update(
          {
            roomId,
          },
          {
            where: { code },
          }
        );
    
        io.emit("/adminSetMCURoom", { code, roomId });
      } catch (error) {
        console.log("/adminSetMCURoom");
        console.log(error);
      }
    });

    // MCU join 1 room theo yêu cầu
    socket.on("/mcuJoinRoom", async ({ code, roomId }) => {
      console.log("/mcuJoinRoom",{ code, roomId });
      try {
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
      } catch (error) {
        console.log("/mcuJoinRoom");
        console.log(error);
      }
      
    });

    // gửi config đến 1 mcu
    socket.on("/configMcu", async ({ configs, mcuId }) => {
      console.log("/configMcu", { configs, mcuId });
      try {
        const mcu = await Mcu.findOne({
          where: { id: mcuId },
          include: {
            model: Room,
            as: "room",
          },
        });
    
        io.to(mcu.room.code).emit("/configMCU", { code: mcu.code, configs });
      } catch (error) {
        console.log("/configMcu");
        console.log(error);
      }
    });

    // Mcu gửi event khi update config thành công
    socket.on("/configMCUSuccess", async ({ code, configs }) => {
      console.log("/configMCUSuccess", { code, configs });
      try {
        const mcu = await Mcu.findOne({
          where: {
            code
          },
          include: {
            model: Room,
            as: "room",
          },
        });
    
        const mcuSetting = await McuSetting.create({
          mcuId: mcu.id,
          configs,
          roomId: mcu.room.id
        });
    
        io.to(mcu.room.code).emit("/configMCUSuccess", { mcuSetting });
      } catch (error) {
        console.log("/configMCUSuccess");
        console.log(error);
      }
    });

    // Mcu gửi state đến user
    socket.on("/mcuUpdateState", async ({ code, data }) => {
      console.log("/mcuUpdateState", { code, data });
      try {
        const mcu = await Mcu.findOne({
          where: {
            code
          },
          include: {
            model: Room,
            as: "room",
          },
        });
    
        const mcuLog = await McuLog.create({
          mcuId: mcu.id,
          data,
          roomId: mcu.room.id
        });
    
        io.to(mcu.room.code).emit("/mcuUpdateState", { mcuLog });
      } catch (error) {
        console.log("/mcuUpdateState");
        console.log(error);
      }
    });

    // Ngắt kết rối
    socket.on("disconnect", async () => {
      console.log("disconnect");
      try {
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
          if(user.room) {
            io.to(user.room.code).emit("/socketDisconnect", { type: "user", object: user });
          }
          delete activeUsers[socket.id]
        } else if (mcu) {
          if(mcu.room) {
            io.to(mcu.room.code).emit("/socketDisconnect", {
              type: "mcu",
              object: mcu,
            });
          }
          delete activeMcus[socket.id]
        }
    
        io.emit("/socketActive", { activeUsers, activeMcus });
      } catch (error) {
        console.log("disconnect");
        console.log(error);
      }
    });
  });
// }

module.exports = io;
