import database from "../database";

const admCheckMiddleware = async (request, response, next) => {
  const id = request.userId;
  const userFind = await database.query("SELECT * FROM users WHERE id = $1", [
    id,
  ]);

  if (userFind.rows[0].isadm) {
    return next();
  } else {
    return response.status(401).json({ message: "Unauthorized" });
  }
};

export default admCheckMiddleware;
