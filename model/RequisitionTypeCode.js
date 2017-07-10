const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.model('RequisitionTypeCode', new Schema({
    typeDescription: {type: Schema.Types.String, required: true},
    code: {type: Schema.Types.Number, required:true}
}, {
    collection: 'requisitionTypeCodes'
}));