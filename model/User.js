var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    id: Schema.Types.ObjectId,
    token: Schema.Types.String,
    requisitions: [{
        type: {type: Schema.Types.ObjectId, ref: 'RequisitionTypeCode'},
        itens: {type: Schema.Types.ObjectId, ref: 'Requisition'}
    }]
}, {
    collection: 'users',
    timestamps: { createdAt: 'createdAt' }
}));