import express, { Express, Request, Response, json } from "express";
import dotenv from "dotenv";
import userRouter from "./user";
import productRouter from "./product";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(json());
app.get("/", (req: Request, res: Response) => {
	res.send("Zapatos playground!");
});

app.use("/user", userRouter);
app.use("/product", productRouter);

console.log(`⚡️[server]: Server starting up`);
app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
