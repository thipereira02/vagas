const data = require("./fakeData");
const ApiError = require("./helpers/apiErrors");

const { NotFoundError } = ApiError;
const { BadRequestError } = ApiError;
const { NoContentError } = ApiError;

let userRequestCount = 0;

const getUser = (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      throw new BadRequestError("Name is required");
    }

    const user = data.find(u => u.name === name);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    userRequestCount++;

    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const getRequestsCount = () => {
  return userRequestCount;
};

const getUsers = (req, res, next) => {
  try {
    if (data.length === 0) {
      throw new NoContentError("No users found");
    }

    return res.send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  getRequestsCount,
  getUsers,
};
