const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auctions', require('./routes/auction'));
app.use('/api/bids', require('./routes/bid'));

// Socket.io
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('placeBid', (data) => {
    io.emit('bidUpdate', data);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Auction System API Running ✅' });
});

const PORT = 5000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/auctionDB';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    server.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log('❌ MongoDB Error:', err));