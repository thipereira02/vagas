const data =  require("./fakeData");
const ApiError = require("./helpers/apiErrors");

const NotFoundError = ApiError.NotFoundError;
const BadRequestError = ApiError.BadRequestError;

const updateUser = (req, res, next) => {

    try {
        
        const { id } =  req.query;
        const { name, job } =  req.body;

        const user = data.find((user) => user.id === Number(id));

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