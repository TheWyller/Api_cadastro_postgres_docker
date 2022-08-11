import createUserServices from "../services/createUser.services";

const createUserControllers = async (request, response) => {
  const { name, email, password, isAdm } = request.body;

  const newUser = await createUserServices(name, email, password, isAdm);

  return response.status(201).json(newUser);
};

export default createUserControllers;
