var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    id: Schema.Types.ObjectId,
    token: Schema.Types.String,
    requisitions: {
        gameStart: [{type: Schema.Types.ObjectId, ref: 'Requisition'}],
        printedAds: [{type: Schema.Types.ObjectId, ref: 'Requisition'}],
        clickedAds: [{type: Schema.Types.ObjectId, ref: 'Requisition'}]
    }
}, {
    collection: 'requisitions',
    timestamps: { createdAt: 'createdAt' }
}));