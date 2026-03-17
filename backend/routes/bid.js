const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');
const Auction = require('../models/Auction');
const auth = require('../middleware/auth');

// Place a bid
router.post('/', auth, async (req, res) => {
  try {
    const { auctionId, amount } = req.body;
    const auction = await Auction.findById(auctionId);

    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    if (auction.status !== 'active') return res.status(400).json({ message: 'Auction is closed' });
    if (amount <= auction.currentPrice) return res.status(400).json({ message: 'Bid must be higher than current price' });

    const bid = await Bid.create({ auctionId, userId: req.user.id, amount });
    await Auction.findByIdAndUpdate(auctionId, { currentPrice: amount });

    res.json({ message: 'Bid placed ✅', bid });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get bids for an auction
router.get('/:auctionId', async (req, res) => {
  try {
    const bids = await Bid.find({ auctionId: req.params.auctionId })
      .populate('userId', 'name')
      .sort({ amount: -1 });
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;