const data =  require("./fakeData");
const ApiError = require("./helpers/apiErrors");

const BadRequestError = ApiError.BadRequestError;
const NotFoundError = ApiError.NotFoundError;

const deleteUser = (req, res, next) => {

    try {
        
        const { name } =  req.query;

        if (!name) {
            throw new BadRequestError('Name is required');
        }

        const updatedData = data.filter((user) => user.name !== name);

        if (updatedData.length === data.length) {
            throw new NotFoundError("User not found");
        }

        data.length = 0;
        data.push(...updatedData);

        res.send("User deleted successfully");

    } catch (error) {
                
        next(error);
            
    }

}

module.exports = deleteUser;