var data =  require("./fakeData");

const getUser = ( req, res, next ) => {

    try {
        const { name } =  req.query;

        if (!name) {
            return res.status(400).send('Name is required');
        }

        const user = data.find( user => user.name === name );

        if (!user) {
            return res.status(404).send('User not found');
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