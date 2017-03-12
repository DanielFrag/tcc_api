var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('RequisitionTypeCode', new Schema({
    id: Schema.Types.ObjectId,
    typeDescription: {type: Schema.Types.String, required: true},
    code: {type: Schema.Types.Number, required:true}
}, {
    collection: 'requisitionTypeCodes'
}));