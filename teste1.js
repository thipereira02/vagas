var data =  require("./fakeData");
var NotFoundError = require("./helpers/apiErrors").NotFoundError;
var BadRequestError = require("./helpers/apiErrors").BadRequestError;

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
    
    res.send(data);
    
};

module.exports = {
    getUser,
    getUsers
};