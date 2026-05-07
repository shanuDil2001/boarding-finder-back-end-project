import jwt from "jsonwebtoken";
import env from "../config/validateEnv.js";

export default function authenticateUser(req, res, next) {
  const bearerTokenString = req.headers.authorization;

  if (bearerTokenString != null) {
    const stringArray = bearerTokenString.split(" ");

    const token = stringArray[1];

    const decoded = jwt.verify(token, env.JWT_SECRET, (error, decoded) => {
      if (decoded != null) {
        req.user = decoded;

        next();
      } else {
        console.error(error);

        return res.status(401).json({
          message: "Invalid token!",
        });
      }
    });
  } else {
    next();
  }
}
