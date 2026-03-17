const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String },
  image:        { type: String, default: '' },
  startPrice:   { type: Number, required: true },
  currentPrice: { type: Number },
  sellerId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  winnerId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  status:       { type: String, default: 'active' },
  endTime:      { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Auction', auctionSchema);