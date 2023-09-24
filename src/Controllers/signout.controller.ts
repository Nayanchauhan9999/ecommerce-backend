import { Request, Response } from "express";

export const singOutUser = (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Signout successfull" });
  } catch (error) {}
};
