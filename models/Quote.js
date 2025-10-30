const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  category: {
    type: String,
    enum: ['mental-health', 'mens-health', 'motivation', 'resilience'],
    default: 'mental-health'
  },
  date: {
    type: Date,
    default: Date.now
  },
  isDailyQuote: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
quoteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Quote', quoteSchema);