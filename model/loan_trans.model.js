'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  Loan_transSchema = new Schema({
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
    transitionType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dateOfLoan: {
        type: Date,
        default:Date.now,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    payFrom: {
        type: String,
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


Loan_transSchema.plugin(require('mongoose-timestamp'));
Loan_transSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});

module.exports = mongoose.model('loan_transition', Loan_transSchema);
