const data = require("./fakeData");
const ApiError = require("./helpers/apiErrors");
const teste1 = require("./teste1");

const { NotFoundError } = ApiError;

const countRequests = (req, res) => {
  const { name } = req.query;

  if (!name) {
    throw new NotFoundError("Name is required");
  }

  const user = data.find(u => u.name === name);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const userRequestCount = teste1.getRequestsCount();

  res.send(`Usuário ${name} foi lido ${userRequestCount} vezes.`);
};

module.exports = countRequests;
