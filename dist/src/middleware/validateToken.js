import jwt from "jsonwebtoken";
const validateToken = (req, res, next) => {
    //geting token from cookie storage, this will run if both token and cookie expire same time
    const token = req.cookies.jwt;
    // const authToken: string | undefined =
    //   req.headers.authorization?.split(" ")[1];
    // if (!token && !authToken) {
    //   res.status(401).json({ message: "Session Expire, Please login" });
    //   return;
    // }
    if (!token) {
        res.status(401).json({ message: "Session Expire, Please login" });
        return;
    }
    //verify jwt token by expiry, only run if logout by admin, because cookie and token expiry time are same ::: eg. cookie stored in cookie storage but token is expired.
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    }
    catch (error) {
        res.json({ message: "You have been logged out, Please login Again" });
        return;
    }
};
export default validateToken;
