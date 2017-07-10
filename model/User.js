const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.model('User', new Schema({
    token: Schema.Types.String,
    requisitions: Schema.Types.Mixed
}, {
    collection: 'users',
    timestamps: { createdAt: 'createdAt' }
}));