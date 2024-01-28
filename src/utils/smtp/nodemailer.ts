import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "roxane8@ethereal.email",
    pass: "REbj2eeTqaZfst62k6",
  },
});
