const data =  require("./fakeData");
const ApiError = require("./helpers/apiErrors");

const NotFoundError = ApiError.NotFoundError;
const BadRequestError = ApiError.BadRequestError;
const NoContentError = ApiError.NoContentError;

const getUser = ( req, res, next ) => {

    try {

        const { name } =  req.query;

        if (!name) {
            throw new BadRequestError('Name is required');
        }

        const user = data.find( user => user.name === name );

        if (!user) {
            throw new NotFoundError('User not found');
        }

        return res.send(user);

    } catch (error) {

        next(error);

    }

};

const getUsers = ( req, res, next ) => {

    try{

        if (data.length === 0) {
            throw new NoContentError('No users found');
        }

        return res.send(data);

    } catch (error) {

        next(error);
        
    }

};

module.exports = {
    getUser,
    getUsers
};