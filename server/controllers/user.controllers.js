'use strict';


exports.getUsers = (req, res) => {
  try {
    res.status(200);
    res.send(JSON.stringify(data));
  } catch (error) {
    res.sendStatus(500);
  }
};
exports.postUser = async (req, res) => {
  try {
    res.status(201);
    res.send(JSON.stringify(newUser));
  } catch (error) {
    res.sendStatus(500);
  }
};
