const express = require('express');
const router = express.Router();
const Auction = require('../models/Auction');
const auth = require('../middleware/auth');

// Get all auctions
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find().populate('sellerId', 'name email');
    res.json(auctions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single auction
router.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id).populate('sellerId', 'name');
    res.json(auction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create auction
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, startPrice, endTime } = req.body;
    const auction = await Auction.create({
      title,
      description,
      startPrice,
      currentPrice: startPrice,
      endTime,
      sellerId: req.user.id
    });
    res.json({ message: 'Auction created ✅', auction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Close auction
router.put('/close/:id', auth, async (req, res) => {
  try {
    const auction = await Auction.findByIdAndUpdate(
      req.params.id,
      { status: 'closed' },
      { new: true }
    );
    res.json({ message: 'Auction closed ✅', auction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
