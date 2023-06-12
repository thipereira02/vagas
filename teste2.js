var data =  require("./fakeData");
var apiErrors = require("./helpers/apiErrors");

var BadRequestError = apiErrors.BadRequestError;

const newUser = (req, res, next) => {

    try {

        var { name, job } =  req.body;

        if (!name || !job) {
            throw new BadRequestError("Name and job are required");
        }

        var id = data.length + 1;
        
        var newUser = {
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