import { Request, Response } from "express";
import { justifyText } from "../utils/justifyText";

const handleTextJustification = async (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ error: "Text is required" });
  }
  const justifiedText = justifyText(text);
  res.set("Content-Type", "text/plain");
  res.send(justifiedText);
};

export { handleTextJustification };
