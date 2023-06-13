const data = require("./fakeData");
const apiErrors = require("./helpers/apiErrors");
const jwt = require("jsonwebtoken");

const BadRequestError = apiErrors.BadRequestError;
const ConflictError = apiErrors.ConflictError;

let lastId = data.length;

const newUser = (req, res, next) => {
    try {

        const { name, job } = req.body;

        if (!name || !job) {
            throw new BadRequestError("Name and job are required");
        }

        const nameInUse = data.find((user) => user.name === name);

        if (nameInUse) {
            throw new ConflictError("Name already in use");
        }

        const id = ++lastId;

        const newUser = {
            id,
            name,
            job
        };

        const token = jwt.sign({ id, name }, process.env.JWT_SECRET);

        newUser.token = token;

        data.push(newUser);

        res.send(newUser);

    } catch (error) {

        next(error);

    }
};

module.exports = newUser;
