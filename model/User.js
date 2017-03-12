let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    id: Schema.Types.ObjectId,
    token: Schema.Types.String,
    requisitions: Schema.Types.Mixed
}, {
    collection: 'users',
    timestamps: { createdAt: 'createdAt' }
}));