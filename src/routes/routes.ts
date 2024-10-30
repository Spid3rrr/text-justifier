import express from "express";
import { generateToken } from "../controllers/TokenController";
import { verifyToken } from "../middleware/TokenMiddleware";
import { verifyAllowance } from "../middleware/AllowanceMiddleware";
import { handleTextJustification } from "../controllers/JustifyController";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/token", generateToken);
router.post("/justify", verifyToken, verifyAllowance, handleTextJustification);

export default router;
