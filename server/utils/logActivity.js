const Log = require("../models/Log");

const logActivity = async (userId, action, description) => {

    try{

        await Log.create({

            user:userId,

            action,

            description

        });

    }
    catch(error){

        console.log(error.message);

    }

};

module.exports = logActivity;