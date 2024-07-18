"use strict";

const { User, Room, Mcu } = require("../models");

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
};

module.exports = {
  myRoom
};
