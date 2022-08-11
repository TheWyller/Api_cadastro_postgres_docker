import * as bcrypt from "bcryptjs";
import database from "../database";

const updateUserServices = async (id, name, email, password, userId) => {
  const resAdm = await database.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  const admFind = resAdm.rows[0];

  if (admFind.isadm && id !== admFind.id) {
    return await updateUser(id, name, email, password, admFind);
  } else if (id === admFind.id) {
    return await updateUser(id, name, email, password, admFind);
  } else {
    throw new Error("Missing admin permissions");
  }
};

export default updateUserServices;

async function updateUser(id, name, email, password, admFind) {
  const res = await database.query("SELECT * FROM users WHERE id = $1", [id]);

  if (res.rows.length === 0) {
    throw new Error("User not found");
  }

  const date = new Date();

  await database.query("UPDATE users SET updatedon = $1 WHERE id = $2", [
    date.toISOString(),
    id,
  ]);

  if (name !== undefined) {
    await database.query("UPDATE users SET name = $1 WHERE id = $2", [
      name,
      id,
    ]);
  }
  if (email !== undefined) {
    await database.query("UPDATE users SET email = $1 WHERE id = $2", [
      email,
      id,
    ]);
  }
  if (password !== undefined) {
    const hashedPass = await bcrypt.hash(password, 10);

    await database.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedPass,
      id,
    ]);
  }
  const resUpdate = await database.query("SELECT * FROM users WHERE id = $1", [
    id,
  ]);

  if (admFind.isadm) {
    return resUpdate.rows[0];
  } else {
    const { id, name, email, isadm, createdon, updatedon } = resUpdate.rows[0];
    return { id, name, email, isadm, createdon, updatedon };
  }
}
