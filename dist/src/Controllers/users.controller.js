var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserModal from "../models/user.model.js";
// method : GET ::: route - /api/v1/users ::: get All users list ::: Login Required
export const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res
                .status(403)
                .json({ message: "You don't have permission to access content" });
        }
        else {
            const getUsersList = yield UserModal.find();
            res.status(200).send(getUsersList);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// method : GET ::: route - /api/v1/user ::: get single user ::: Login Required
export const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findUser = yield UserModal.findById(req.params.id);
        if (!findUser) {
            res.status(404).json({ message: "Not found" });
            return;
        }
        res.status(200).send(findUser);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// method : PATCH , update single user
export const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield UserModal.findByIdAndUpdate({ _id: req.params.id }, req.body);
        if (updatedUser)
            res.status(200).send(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// method : DELETE , delete single user
export const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield UserModal.findByIdAndDelete(req.params.id);
        console.log(deletedUser);
        if (deletedUser)
            res.status(202).send(deletedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
