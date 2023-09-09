import jwt from "jsonwebtoken";
const validateToken = (req, res, next) => {
    var _a;
    //geting token from cookie storage, this will run if both token and cookie expire same time
    const token = req.cookies.jwt;
    const getTokenFromHeaders = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer", "").trim();
    if (!token) {
        res.status(403).json({ message: "Session Expire, Please login" });
        return;
    }
    //check that token is avilable in headers, if not user is Unauthorized.
    if (!getTokenFromHeaders) {
        res.status(401).json({ message: "Access Token Not Provided" });
        return;
    }
    //verify jwt token by expiry, only run if logout by admin, because cookie and token expiry time are same ::: eg. cookie stored in cookie storage but token is expired.
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY);
        jwt.verify(getTokenFromHeaders, process.env.JWT_SECRET_KEY);
        next();
    }
    catch (error) {
        res.json({ message: "You have been logged out, Please login Again" });
        return;
    }
};
export default validateToken;
