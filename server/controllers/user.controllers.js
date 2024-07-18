"use strict";

const moment = require('moment-timezone');
const timezone = "Asia/Bangkok";

const { User, Room, Mcu, McuLog, McuSetting } = require("../models");
const { Op } = require('sequelize');

const myRoom = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({
      attributes: { exclude: ["password"] },
      where: { id },
      include: {
        model: Room,
        as: "room",
        include: {
          model: Mcu,
          as: "mcus",
        }
      },
    });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "System Error!" });
  }
}

const myRoomInfo = async (req, res) => {
  try {
    const { id } = req.user;

    console.log(req.user)
    
    const user = await User.findOne({where: {id}});
    if(!user || !user.roomId) {
      return res.status(400)
    }

    let { startDay, endDay } = req.query;

    startDay = moment.tz(`${startDay} 00:00:00`, timezone);
    endDay = moment.tz(`${endDay} 23:59:59`, timezone);

    let startDayUTC = startDay.clone().utc();
    let endDayUTC = endDay.clone().utc();
    console.log( user.roomId)
    console.log( await Room.findOne({where: { id: 2 }}))
    const room = await Room.findOne({
      where: { id: user.roomId },
      include: [
        {
          model: User,
          as: "users",
          attributes: { exclude: ["password"] },
        },
        {
          model: Mcu,
          as: "mcus",
        },
        {
          required: false,
          model: McuLog,
          as: "mcuLogs",
          where: {
            createdAt:{
              [Op.between]: [startDayUTC.toDate(), endDayUTC.toDate()],
            }
          },
          include: {
            model: Mcu,
            as: "mcu",
          }
        },
        {
          required: false,
          model: McuSetting,
          as: "mcuSettings",
          where: {
            createdAt:{
              [Op.between]: [startDayUTC.toDate(), endDayUTC.toDate()],
            }
          },
          include: {
            model: Mcu,
            as: "mcu",
          }
        }
      ],
    });

    res.status(200).json({ room });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "System Error!" });
  }
};

module.exports = {
  myRoom,
  myRoomInfo
};
