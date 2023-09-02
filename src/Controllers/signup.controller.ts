import { Response, Request } from "express";
import UserModal from "../models/user.model";
import { IUser } from "../utils/Types";

export const createUser = async (req: Request<{}, {}, IUser>, res: Response) => {
  const { email, password, confirmPassword } = req.body;

  if (!password) {
    res.json({ password: "Please Enter your Password" });
    return;
  }

  if (!confirmPassword) {
    res.json({ confirmPassword: "Please Enter confirm Password" });
    return;
  }
  if (!email) {
    res.json({ email: "Please Enter Your Email" });
    return;
  }

  if (!email.includes("@")) {
    res.json({ email: "Please enter valid email" });
    return;
  }

  if (password.length <= 7) {
    res.json({ password: "Password should be atleast 8 characters" });
    return;
  }

  if (confirmPassword !== password) {
    res.json({ message: "Password and confirm passworld does't match" });
    return;
  }

  const isUserExist = await UserModal.findOne({ email });

  if (isUserExist) {
    res.json({ email: "Email already registered" });
    return;
  }

  const newUser = new UserModal({ email, password, confirmPassword });
  const createdUser = await newUser.save();

  res.status(201).json(createdUser);
};
