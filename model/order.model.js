'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    
    payFrom: {
        type: String,
        required: true
    },
    isActive: {
        type: Number,
        required: true
    },
    isDelete: {
        type: Number,
        required: true
    }
});


OrderSchema.plugin(require('mongoose-timestamp'));
OrderSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});

module.exports = mongoose.model('Order', OrderSchema);
