import deleteUserServices from "../services/deleteUser.services";

const deleteUserControllers = async (request, response) => {
  try {
    const { id } = request.params;
    const userId = request.userId;
    const userDeleted = await deleteUserServices(id, userId);

    return response.json(userDeleted);
  } catch (error) {
    return response.status(401).json({ message: error.message });
  }
};

export default deleteUserControllers;
