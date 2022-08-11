import database from "../database";

const listUserServices = async (userId) => {
  const res = await database.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);

  const userFind = res.rows[0];

  if (userFind.isadm) {
    return userFind;
  } else {
    const { id, name, email, isadm, createdon, updatedon } = userFind;
    return { id, name, email, isadm, createdon, updatedon };
  }
};

export default listUserServices;
