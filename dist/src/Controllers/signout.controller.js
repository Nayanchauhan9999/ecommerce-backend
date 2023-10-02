export const singOutUser = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.json({ message: "Signout successfull" });
    }
    catch (error) { }
};
