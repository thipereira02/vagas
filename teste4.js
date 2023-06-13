const data = require("./fakeData");
const ApiError = require("./helpers/apiErrors");

const { NotFoundError } = ApiError;
const { BadRequestError } = ApiError;

const updateUser = (req, res, next) => {
  try {
    const { id } = req.query;
    const { name, job } = req.body;

    const user = data.find(u => u.id === Number(id));

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (!name || !job) {
      throw new BadRequestError("Name and job are required");
    }

    user.name = name;
    user.job = job;

    res.send(user);
  } catch (error) {
    next(error);
  }
};

module.exports = updateUser;
