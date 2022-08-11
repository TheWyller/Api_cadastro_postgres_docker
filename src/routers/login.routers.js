import { Router } from "express";
import loginUserControllers from "../controllers/loginUser.controllers";

const router = Router();

router.post("", loginUserControllers);

export default router;
