import database from "../database";

const deleteUserServices = async (id, userId) => {
  const res = await database.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);

  const admFind = res.rows[0];

  if (admFind.isadm && id !== admFind.id) {
    return deleteUser(id);
  } else if (id === admFind.id) {
    return deleteUser(id);
  } else {
    throw new Error("Missing admin permissions");
  }
};

export default deleteUserServices;

async function deleteUser(id) {
  const resUser = await database.query("SELECT * FROM users WHERE id = $1", [
    id,
  ]);

  if (resUser.rows.length === 0) {
    throw new Error("User not found");
  }

  const res = await database.query("DELETE FROM users WHERE id = $1", [id]);

  return { message: "User deleted with success" };
}
