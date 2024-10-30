import { db, User } from "../data/database";
import { NextFunction, Request, Response } from "express";

const generateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userEmail = req.body.email;
  if (!userEmail) {
    res.status(400).json({ error: "Email is required" });
    return;
  }
  if (typeof userEmail !== "string") {
    res.status(400).json({ error: "Email must be a string" });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userEmail)) {
    res.status(400).json({ error: "Invalid email" });
    return;
  }
  const token = Math.random().toString(36).substr(2);
  const newUser: User = {
    email: userEmail,
    allowance: 80000,
    lastTransaction: new Date().getTime(),
  };
  db.set(token, newUser);
  res.json({ token });
};

export { generateToken };
