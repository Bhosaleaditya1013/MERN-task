const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express(); // ✅ Declare 'app' first!

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/candidates', require('./routes/candidateRoutes'));
app.use('/api/auth', authRoutes);


// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
