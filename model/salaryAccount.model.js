"use strict";

const { string, array } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const salartAccountSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  salaryId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  creditedSalary: {
    type: Number,
    required: true,
  },
  SalaryDetails: {
    CompanyName: {
      type: String,
      required:true
    },
    totalSalary: {
      type: Number,
      required:true
    },
    DateOfSalary: {
      type: String,
    },
    type:Array,
    required:true
  },
  CreditedDateOfSalary: {
    type: String,
    required: true,
  },
  monthId: {
    type: Number,
    required: true,
  },
 
  dateId: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Number,
    required: true,
  },
  isDelete: {
    type: Number,
    required: true,
  },
});

salartAccountSchema.plugin(require("mongoose-timestamp"));
salartAccountSchema.plugin(require("mongoose-delete"), {
  overrideMethods: true,
  deletedAt: true,
});

module.exports = mongoose.model("salartAccount", salartAccountSchema);
