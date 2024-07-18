"use strict";

const CryptoJS = require("crypto-js");
const { User, Room, Mcu } = require("../models");
const { v4: uuidv4 } = require("uuid");

const createUser = async (req, res) => {
  const { username, password, roomId } = req.body;
  try {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const user = await User.create({
      username,
      password: hashedPassword,
      roomId,
    });

    delete user.password;

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "System Error!" });
  }
};

const createRoom = async (req, res) => {
  try {
    const uuid = uuidv4();

    const room = await Room.create({
      code: `ROOM_${uuid}`,
    });

    res.status(200).json({ room });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "System Error!" });
  }
};

const listRoom = async (req, res) => {
  try {
    const rooms = await Room.findAll();

    res.status(200).json({ rooms });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "System Error!" });
  }
};

const listUser = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "System Error!" });
  }
};

const getRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findOne({
      where: { id },
      include: {
        model: User,
        as: "users",
        attributes: { exclude: ["password"] }
      },
    });

    res.status(200).json({ room });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "System Error!" });
  }
};

const listMcu = async (req, res) => {
  try {
    const mcus = await Mcu.findAll();

    res.status(200).json({ mcus });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "System Error!" });
  }
};

module.exports = {
  createUser,
  createRoom,
  listRoom,
  getRoom,
  listUser,
  listMcu
};
