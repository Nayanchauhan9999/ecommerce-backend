import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  //geting token from cookie storage, this will run if both token and cookie expire same time
  const token = req.cookies.jwt;
  if (!token) {
    res.status(403).json({ message: "Session Expire, Please login" });
    return;
  }
  //verify jwt token by expiry, only run if logout by admin, because cookie and token expiry time are same ::: eg. cookie stored in cookie storage but token is expired.
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (error) {
    res.json({ message: "You have been logged out, Please login Again" });
    return;
  }
};

export default validateToken;
