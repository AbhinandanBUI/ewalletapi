'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    productName_Id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dop: {
        type:  Date,
        required: true
    },
    monthId: {
        type: Number,
        required: true
    },
    payFrom: {
        type: String,
        required: true
    },
    dateId: {
        type: Number,
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


ProductSchema.plugin(require('mongoose-timestamp'));
ProductSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});

module.exports = mongoose.model('tproduct', ProductSchema);
