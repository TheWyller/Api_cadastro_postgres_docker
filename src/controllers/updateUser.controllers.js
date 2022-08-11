import updateUserServices from "../services/updateUser.services";

const updateUserControllers = async (request, response) => {
  try {
    const userId = request.userId;
    const { id } = request.params;
    const { name, email, password } = request.body;

    const userInfo = await updateUserServices(
      id,
      name,
      email,
      password,
      userId
    );

    return response.json(userInfo);
  } catch (error) {
    return response.status(401).json({ message: error.message });
  }
};

export default updateUserControllers;
