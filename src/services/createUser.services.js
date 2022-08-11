import * as bcrypt from "bcryptjs";
import database from "../database";

const createUserServices = async (name, email, password, isAdm) => {
  const hashedPass = await bcrypt.hash(password, 10);
  const date = new Date();
  const createdOn = date.toISOString();
  const updatedOn = date.toISOString();
  const res = await database.query(
    "INSERT INTO users(email,name,password,isadm,createdon,updatedOn) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
    [email, name, hashedPass, isAdm, createdOn, updatedOn]
  );
  const { id, isadm, createdon, updatedon } = res.rows[0];
  return { id, email, name, isadm, createdon, updatedon };
};

export default createUserServices;
