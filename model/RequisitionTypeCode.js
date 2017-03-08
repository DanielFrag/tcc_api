var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('RequisitionTypeCode', new Schema({
    id: Schema.Types.ObjectId,
    type: Schema.Types.String,
    code: Schema.Types.Number
}, {
    collection: 'requisitionTypeCodes'
}));