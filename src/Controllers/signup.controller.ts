import { Response, Request } from "express";
import UserModal from "../models/user.model";
import { IUser } from "../utils/Types";

export const createUser = async (
  req: Request<{}, {}, IUser>,
  res: Response
) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  const errors: string[] = [];

  if (!firstName) {
    errors.push("Please enter your first Name");
  }
  if (!lastName) {
    errors.push("Please enter your Last Name");
  }
  if (!email) {
    errors.push("Please enter your email");
  }
  if (!password) {
    errors.push("Please enter Password");
  }
  if (!confirmPassword) {
    errors.push("Please enter confirm Password");
  }

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    res.status(400).json({ message: errors });
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

  const newUser = new UserModal({
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
  });
  const createdUser: IUser = await newUser.save();

  const sendResponseObject = {
    id: createdUser.id,
    firstName: createdUser?.firstName,
    lastName: createdUser?.lastName,
    email: createdUser?.email,
  };

  res.status(201).json(sendResponseObject);
};
