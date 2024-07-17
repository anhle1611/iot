"use strict";

const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { User, Role, Room } = require("../models");
const config = require("../config");

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = CryptoJS.SHA256(password).toString();

    const user = await User.findOne({
      attributes: {
        exclude: ["updatedAt", "createdAt", "deletedAt"]
      },
      where: { username },
      include: [
        {
          model: Role,
          as: "roles",
        },
        {
          model: Room,
          as: "room",
        },
      ],
    });

    if (!user || hashedPassword !== user.password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    user.password = undefined;

    const token = jwt.sign({ user }, config.jwt.secret, {
      expiresIn: config.jwt.expires,
    });

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "System Error!" });
  }
};

module.exports = {
  login,
};
