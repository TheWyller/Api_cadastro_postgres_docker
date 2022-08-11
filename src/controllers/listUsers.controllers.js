import listUsersServices from "../services/listUsers.services";

const listUsersControllers = async (request, response) => {
  const allUsers = await listUsersServices();
  return response.json(allUsers);
};

export default listUsersControllers;
