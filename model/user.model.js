"use strict";

const { number, date } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  imageName:{
    type: String,
    required: true,
  },
  imageSize:{
    type: String,
    required: true,
  },
  profilePath: {
    type: String,
    required: true,
  },
  roleId: {
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

UserSchema.plugin(require("mongoose-timestamp"));
UserSchema.plugin(require("mongoose-delete"), {
  overrideMethods: true,
  deletedAt: true,
});

module.exports = mongoose.model("User", UserSchema);
