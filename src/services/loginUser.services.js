import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import database from "../database";

const loginUserServices = async (email, password) => {
  const res = await database.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (res.rows.length === 0) {
    throw new Error("Wrong email/password");
  }

  const user = res.rows[0];

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    throw new Error("Wrong email/password");
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
    subject: user.id,
  });
  return token;
};

export default loginUserServices;
