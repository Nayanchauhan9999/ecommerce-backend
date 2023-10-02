// if type of req is ::: POST, PATCH  ==> req.body should not be null
var validateReqBody = function (req, res, next) {
    if (req.method === "POST" || req.method === "PATCH") {
        if (Object.keys(req.body).length <= 0) {
            res.status(400).json({ message: "Please Enter required Fields" });
            return;
        }
    }
    next();
};
export default validateReqBody;
