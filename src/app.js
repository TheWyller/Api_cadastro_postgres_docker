import express from "express";
import userRouter from "./routers/users.routers";
import loginRouter from "./routers/login.routers";
import { startDatabase } from "./database";
import "dotenv/config";

const app = express();

app.use(express.json());

app.use("/login", loginRouter);
app.use("/users", userRouter);

app.listen(process.env.PORT || 3000, async () => {
  console.log("Fumegou o trenzinho da alegria");
  await startDatabase();
});

export default app;
