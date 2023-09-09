import { Response, Request } from "express";
import { IUser } from "../utils/Types/index.js";
import bcrypt from "bcrypt";
import UserModal from "../models/user.model.js";

export const signinUser = async (
  req: Request<{}, {}, IUser>,
  res: Response
) => {
  const { email, password } = req.body;

  if (!email) {
    res.json({ message: "Please enter you email" });
    return;
  }
  if (!password) {
    res.json({ message: "Please enter you password" });
    return;
  }

  const findUser = await UserModal.findOne({ email });

  if (!findUser) {
    res.json({ message: "Email not registered" });
    return;
  }
  const comparePassword = await bcrypt.compare(password, findUser.password);

  if (!comparePassword) {
    res.status(400).json({ message: "Email or password does't match" });
    return;
  }
  const token = await findUser.generateAuthToken();

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
    httpOnly: true,
  });

  const sendResponseObject = {
    id: findUser?.id,
    email: findUser?.email,
    token: findUser?.tokens[findUser.tokens.length - 1]?.token,
  };

  res.send(sendResponseObject);
};
