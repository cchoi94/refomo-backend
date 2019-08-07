const mongoose = require('mongoose')

const refPostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  refCode: { type: String, required: true },
  refType: {type: String, required: true},
  user: {type: String}
})

module.exports = mongoose.model('RefPost', refPostSchema)