import jwt from "jsonwebtoken";
import "dotenv/config";

const tokenCheckMiddleware = (request, response, next) => {
  let token = request.headers.authorization;

  if (!token) {
    response.status(401).json({ message: "Missing authorization headers" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return response.status(401).json({ message: "Invalid Token" });
    }
    request.userId = decoded.sub;
    return next();
  });
};

export default tokenCheckMiddleware;
