import { Request, Response } from "express";
import UserModal from "../models/user.model";
import { IUser } from "../utils/Types";

// method : GET , get All users list
export const getUsers = async (req: Request, res: Response) => {
  try {
    const getUsersList: IUser[] = await UserModal.find();
    res.status(200).send(getUsersList);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// method : GET , get single user
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
    const updatedUser = await UserModal.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
      );
    res.status(200).send(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
