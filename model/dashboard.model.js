'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  dashboardSchema = new Schema({
    Id: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        // ref:'',
        required: true
    },
    totalProductDaily: {
        type: Number ,
        required: true
    },
    totalProductMonth: {
        type: Number ,
        required: true
    },
    totalProductYearly: {
        type: Number ,
        required: true
    },
    
    totalAmount: {
        type: Number,
        required: true
    },
    dateOfCreated:{
        type:Date,
        required:true
    }, 
    createdBy: {
        type: Date,
        required: true
    } ,
    status: {
        type: Number,
        required: true
    } ,
    isActive: {
        type: Number,
        required: true
    },
    isDelete: {
        type: Number,
        required: true
    }
});


dashboardSchema.plugin(require('mongoose-timestamp'));
dashboardSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});

module.exports = mongoose.model('dashboard', dashboardSchema);
