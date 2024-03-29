import { Response, Request } from "express";
import { IUser } from "../utils/Types/index.js";
import bcrypt from "bcrypt";
import UserModal from "../models/user.model.js";
import { transporter } from "../utils/smtp/nodemailer.js";

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

  //set domain for cookies
  res.cookie("jwt", token, {
    //token expires in 1 hour
    expires: new Date(Date.now() + 1000 * 60 * 60),
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });

  const sendResponseObject = {
    id: findUser?.id,
    email: findUser?.email,
    token: findUser?.tokens[findUser.tokens.length - 1]?.token,
  };

  try {
    const mail = await transporter.sendMail({
      from: "Ethereal Email <nayanchauhan9999@gmail.com>",
      to: "nayan chauhan <roxane8@ethereal.email>",
      subject: "Hello ✔ hi",
      text: "Hello world?",
      html: "<b>Hello world? how are you?</b>",
    });
  } catch (error) {
    console.log(error);
  }
  res.send(sendResponseObject);
};
