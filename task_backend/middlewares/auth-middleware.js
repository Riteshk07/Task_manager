import Jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];

      const { userID } = Jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Get user from token
      req.user = await UserModel.findById(userID).select("-password");

      // Check if the token is close to expiration (e.g., within 5 minutes)
      const decodedToken = Jwt.decode(token);
      const expirationTimestamp = decodedToken.exp * 1000;
      const currentTimestamp = Date.now();

      if (expirationTimestamp - currentTimestamp < 300000) {
        // If the token is about to expire in 5 minutes or less, issue a new token
        const newToken = Jwt.sign({ userID }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d", // Set a longer expiration time for the new token
        });

        res.setHeader("Authorization", `Bearer ${newToken}`);
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: "failed", message: "Unauthorized User" });
    }
  }

  if (!token) {
    res.status(401).send({ status: "failed", message: "Unauthorized User, Token not found" });
  }
};

export default checkUserAuth;
