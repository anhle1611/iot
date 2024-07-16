const jwt = require("jsonwebtoken");
const config = require("../config");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, config.jwt.secret, (err, { user }) => {
      if (err) return res.status(401);

      req.user = user;
      return next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const checkRole = (permission) => {
  return async function handler(req, res, next) {
    try {
      if (permission && Array.isArray(permission) && permission.length !== 0) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (token == null) return res.sendStatus(401);

        jwt.verify(token, config.jwt.secret, (err, { user }) => {
          if (err) return res.sendStatus(403);
          if (user.roles) {
            const listRoles = user.roles.find((item) =>
              permission.includes(item.code)
            );

            if (listRoles) {
              return next();
            }
          }
        });
      }

      return res.status(403);
    } catch (error) {
      console.log(error);

      return res.status(500);
    }
  };
};

module.exports = { authenticateToken, checkRole };
