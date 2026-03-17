const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  auctionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction' },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount:    { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Bid', bidSchema);