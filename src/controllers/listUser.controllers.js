import listUserServices from "../services/listUser.services";

const listUserControllers = async (request, response) => {
  const userId = request.userId;
  const userInfo = await listUserServices(userId);
  return response.json(userInfo);
};

export default listUserControllers;
