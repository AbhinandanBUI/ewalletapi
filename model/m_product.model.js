'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const m_producttSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dop: {
        type: String,
        required: true
    },
    monthId: {
        type: String,
        required: true
    },
 
    dateId: {
        type: String,
        required: true
    },
    isActive: {
        type: String,
        required: true
    },
    isDelete: {
        type: String,
        required: true
    }
});


m_producttSchema.plugin(require('mongoose-timestamp'));
m_producttSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});

module.exports = mongoose.model('m_product', m_producttSchema);
