const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({ subName: String });

module.exports = childSchema;
