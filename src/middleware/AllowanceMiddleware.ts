import { Request, Response, NextFunction } from "express";
import { db, User } from "../data/database";

const verifyAllowance = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user: User = (req as any).user;
  const token = (req as any).token;
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const text = req.body.text;
  if (!text) {
    res.status(400).json({ error: "Text is required" });
    return;
  }
  const words = text.split(" ");
  const totalWords = words.length;
  const lastTransaction = user.lastTransaction;
  const currentTime = new Date().getTime();
  // Reset allowance if last transaction was not today
  if (
    new Date(lastTransaction).getUTCDate() !==
    new Date(currentTime).getUTCDate()
  ) {
    user.allowance = 80000;
  }
  if (totalWords > user.allowance) {
    res.status(402).json({ error: "Payment Required" });
    return;
  }
  user.allowance -= totalWords;
  user.lastTransaction = currentTime;
  db.set(token, user);
  next();
};

export { verifyAllowance };
