'use strict';

 const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmiPaySchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    emiName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dateOfEmi: {
        type: Date,
        required: true
    },
    Emiamount: {
        type: Number,
        required: true
    },
    
    principle: {
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


EmiPaySchema.plugin(require('mongoose-timestamp'));
EmiPaySchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});

module.exports = mongoose.model('EmiPay', EmiPaySchema);
