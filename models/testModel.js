const mongoose = require('mongoose');

const testSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const testModel = mongoose.model('test', testSchema);

module.exports = testModel;
