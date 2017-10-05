const mongoose = require('mongoose');

const childSchema = require('./ChildSchema');

const testSchema = new mongoose.Schema(
  {
    name: String,
    child: childSchema,
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
