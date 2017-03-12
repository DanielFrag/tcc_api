let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    id: Schema.Types.ObjectId,
    token: Schema.Types.String,
    requisitionsByType: [{
        type: Schema.Types.Number,
        itens: [{
            date: Schema.Types.Date,
            gmt: Schema.Types.Number
        }]
    }]
}, {
    collection: 'users',
    timestamps: { createdAt: 'createdAt' }
}));