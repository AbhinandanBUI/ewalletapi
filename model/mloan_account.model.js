'use strict';

const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  mLoan_accountSchema = new Schema({
    loanId: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        // ref:'',
        required: true
    },
    loanerId: {
        type: Number,
        required: true
    },
    loanerName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    toDate: {
        type: String,
        required: true
    },
    fromdate: {
        type: String,
        required: true
    } ,
    totalSendAmount: {
        type: Number,
        required: true
    } ,
    totalReceiveAmount: {
        type: Number,
        required: true
    } ,
    totalPayAmount: {
        type: Number,
        required: true
    } ,
    
    createdBy: {
        type: String,
        required: true
    } ,
    status: {
        type: String,
        required: true
    } ,
    isActive: {
        type: String,
        required: true
    },
    isDelete: {
        type: String,
        required: true
    }
});


mLoan_accountSchema.plugin(require('mongoose-timestamp'));
mLoan_accountSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});

module.exports = mongoose.model('mLoan_account', mLoan_accountSchema);
