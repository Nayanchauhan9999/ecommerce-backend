import { isValidObjectId } from "mongoose";
/*
 *  👉 About this Middleware
 *
 *  💨 This middleware will check and validate id before req made. This is route level middleware. this checkes will be checked. [1]. id should be present [2]. id should not be tempared id by user. [3]. It should be valid mogoose id.
 *
 *
 */
const validateId = (req, res, next) => {
    if (!req.params.id || !isValidObjectId(req.params.id)) {
        res.status(404).json({ meessage: "Not Found" });
        return;
    }
    next();
};
export default validateId;
