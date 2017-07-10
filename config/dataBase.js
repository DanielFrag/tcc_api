const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const urlDb = require('./parameters.js').urlDb;
module.exports = (callback)=>{
    mongoose
        .connect(urlDb)
        .then(
            () => {
                console.log('connected: ' + urlDb);
            },
            err => {
                console.log('db connection error');
            }
        )
        .then(
            () => {
                if (callback) {
                    callback();
                }
            }
        );

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('db connection closed');
            process.exit(0);
        });
    });
};