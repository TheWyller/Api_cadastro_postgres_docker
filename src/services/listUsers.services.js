import database from "../database";

const listUsersServices = async () => {
  const res = await database.query("SELECT * FROM users");

  return res.rows;
};

export default listUsersServices;
