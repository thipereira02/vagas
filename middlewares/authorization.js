const jwt = require("jsonwebtoken");
const { ForbiddenError } = require("../helpers/apiErrors");

const { JWT_SECRET } = process.env;

const authorizationMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new ForbiddenError("Authorization header is required");
    }

    const token = authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(token, JWT_SECRET);

    const { id: userId } = decodedToken;
    const { id: updateId, name: deleteName } = req.query;

    const updateOperation = updateId && userId !== Number(updateId);
    const deleteOperation = deleteName && decodedToken.name !== deleteName;

    if (updateOperation || deleteOperation) {
      throw new ForbiddenError("Action not allowed");
    }

    req.user = decodedToken;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizationMiddleware;
