const mongoose = require('mongoose');


const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_PORT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('db is connected')
    }
    catch (error) {
        console.log(error);
    }

}

module.exports = { connect }