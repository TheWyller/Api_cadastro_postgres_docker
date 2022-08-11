import { Router } from "express";

import createUserControllers from "../controllers/createUser.controllers";
import deleteUserControllers from "../controllers/deleteUser.controllers";
import listUserControllers from "../controllers/listUser.controllers";
import listUsersControllers from "../controllers/listUsers.controllers";
import loginUserControllers from "../controllers/loginUser.controllers";
import updateUserControllers from "../controllers/updateUser.controllers";
import admCheckMiddleware from "../middlewares/admCheck.middleware";
import emailCheckMiddleware from "../middlewares/emailCheck.middleware";
import tokenCheckMiddleware from "../middlewares/tokenCheck.middleware";

import userSchema from "../database/schema/user.schema";
import schemaValidation from "../middlewares/schemaValidation.middleware";

const router = Router();

router.get("", tokenCheckMiddleware, admCheckMiddleware, listUsersControllers);
router.get("/profile", tokenCheckMiddleware, listUserControllers);

router.post(
  "",
  schemaValidation(userSchema),
  emailCheckMiddleware,
  createUserControllers
);

router.patch("/:id", tokenCheckMiddleware, updateUserControllers);
router.delete("/:id", tokenCheckMiddleware, deleteUserControllers);

export default router;
