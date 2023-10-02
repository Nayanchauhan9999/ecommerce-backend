export var singOutUser = function (req, res) {
    try {
        res.clearCookie("jwt");
        res.json({ message: "Signout successfull" });
    }
    catch (error) { }
};
