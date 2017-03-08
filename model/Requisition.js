var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Requisition', new Schema({
    id: Schema.Types.ObjectId,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    gmt: Schema.Types.Number
}, {
    collection: 'requisitions',
    timestamps: { createdAt: 'date' }
}));