const jwt = require("jsonwebtoken");
const data = require("./fakeData");
const apiErrors = require("./helpers/apiErrors");

const { BadRequestError } = apiErrors;
const { ConflictError } = apiErrors;

let lastId = data.length;

const createUser = (req, res, next) => {
  try {
    const { name, job } = req.body;

    if (!name || !job) {
      throw new BadRequestError("Name and job are required");
    }

    const nameInUse = data.find(user => user.name === name);

    if (nameInUse) {
      throw new ConflictError("Name already in use");
    }

    const id = ++lastId;

    const newUser = {
      id,
      name,
      job,
    };

    const token = jwt.sign({ id, name }, process.env.JWT_SECRET);

    newUser.token = token;

    data.push(newUser);

    res.send(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
