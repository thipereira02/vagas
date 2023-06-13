const data =  require("./fakeData");
const apiErrors = require("./helpers/apiErrors");

const BadRequestError = apiErrors.BadRequestError;

const newUser = (req, res, next) => {

    try {

        const { name, job } =  req.body;

        if (!name || !job) {
            throw new BadRequestError("Name and job are required");
        }

        const id = data.length + 1;
        
        const newUser = {
            id,
            name,
            job,
        }

        data.push(newUser);
        
        res.send(newUser);

    } catch (error) {
            
        next(error);
            
    }

};

module.exports = newUser;