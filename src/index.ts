import express, { Request, Response } from "express";
import router from "./routes/routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/healthcheck", (req: Request, res: Response) => {
  res.send("OK");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
