var mongoose = require('mongoose');
module.exports = (testDB, callback)=>{
    if (testDB) {
        mongoose.connect(require('./parameters.js').testUrlDb)
            .then(
                () => {
                    console.log('connected');
                },
                err => {
                    console.log('test db connection error');
                }
            )
            .then(
                () => {
                    if (callback) {
                        callback();
                    }
                }
            );
    } else {
        mongoose.connect(require('./parameters.js').urlDb)
            .then(
                () => {
                    console.log('connected');
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
    }

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('db connection closed');
            process.exit(0);
        });
    });
};