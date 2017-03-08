var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('RequisitionByType', new Schema({
    id: Schema.Types.ObjectId,
    idType: {type: Schema.Types.ObjectId, ref: 'RequisitionTypeCode'},
    requisitions: [{type: Schema.Types.ObjectId, ref: 'Requisition'}]
}, {
    collection: 'requisitionsByType'
}));