import loginUserServices from "../services/loginUser.services";

const loginUserControllers = async (request, response) => {
  try {
    const { email, password } = request.body;
    const userInfo = await loginUserServices(email, password);
    return response.status(200).json({ token: userInfo });
  } catch (error) {
    return response.status(401).json({ message: error.message });
  }
};

export default loginUserControllers;
