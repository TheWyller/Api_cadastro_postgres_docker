const schemaValidation = (schema) => async (request, response, next) => {
  try {
    const validateData = await schema.validate(request.body);
    request.body = validateData;
    return next();
  } catch (error) {
    return response.status(400).json({
      message: error.errors.join(", "),
    });
  }
};

export default schemaValidation;
