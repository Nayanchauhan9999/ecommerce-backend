import { Request, Response } from "express";
import UserModal from "../models/user.model.js";
import { IUser } from "../utils/Types/index.js";

// method : GET ::: route - /api/v1/users ::: get All users list ::: Login Required
export const getUsers = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.jwt;
    const authToken: string | undefined =
      req.headers.authorization?.split(" ")[1];
    

    if (!token && !authToken) {
      res
        .status(403)
        .json({ message: "You don't have permission to access content" });
    } else {
      const getUsersList: IUser[] = await UserModal.find();
      res.status(200).send(getUsersList);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// method : GET ::: route - /api/v1/user ::: get single user ::: Login Required
export const getUser = async (req: Request, res: Response) => {
  try {
    const findUser = await UserModal.findById(req.params.id);
    if (!findUser) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).send(findUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// method : PATCH , update single user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser: IUser | null = await UserModal.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (updatedUser)
      res.status(200).json({ message: "User Details Update success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// method : DELETE , delete single user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser: IUser | null = await UserModal.findByIdAndDelete(
      req.params.id
    );
    console.log(deletedUser);

    if (deletedUser) res.status(202).send(deletedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
