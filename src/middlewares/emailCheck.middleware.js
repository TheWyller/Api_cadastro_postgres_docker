import database from "../database";

const emailCheckMiddleware = async (request, response, next) => {
  const { email } = request.body;

  const res = await database.query("SELECT * FROM users");

  const emailExists = res.rows.find((elem) => elem.email === email);

  if (emailExists) {
    return response.status(400).json({ message: "E-mail already registered" });
  }

  return next();
};

export default emailCheckMiddleware;
