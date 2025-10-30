const express = require('express');
const router = express.Router();
const quoteService = require('../services/quoteService');
const Quote = require('../models/Quote');

// Get today's quote
router.get('/today', async (req, res) => {
  try {
    const quote = await quoteService.getTodayQuote();
    res.json({
      success: true,
      data: quote
    });
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching today\'s quote',
      error: error.message
    });
  }
});

// Delete today's quote (to force regeneration)
router.delete('/today', async (req, res) => {
  try {
    // This is a simple approach - in a real app, you'd want authentication here
    // For now, we'll just allow deletion to trigger new quote generation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Delete today's quote from database
    await Quote.deleteMany({
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      },
      isDailyQuote: true
    });
    
    res.json({
      success: true,
      message: 'Today\'s quote deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting today\'s quote:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting today\'s quote',
      error: error.message
    });
  }
});

// Test AI quote generation endpoint
router.get('/test-ai', async (req, res) => {
  try {
    const aiQuote = await quoteService.generateAIQuote();
    
    if (aiQuote) {
      res.json({
        success: true,
        message: 'AI quote generated successfully',
        data: aiQuote,
        isAI: true
      });
    } else {
      res.json({
        success: false,
        message: 'Failed to generate AI quote - falling back to predefined quote',
        data: quoteService.getRandomPredefinedQuote(),
        isAI: false
      });
    }
  } catch (error) {
    console.error('Error testing AI quote generation:', error);
    res.status(500).json({
      success: false,
      message: 'Error testing AI quote generation',
      error: error.message
    });
  }
});

module.exports = router;

// Get a random quote (not necessarily today's)
router.get('/random', async (req, res) => {
  try {
    const quote = quoteService.getRandomPredefinedQuote();
    res.json({
      success: true,
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching random quote',
      error: error.message
    });
  }
});

// Get all quotes (admin endpoint)
router.get('/all', async (req, res) => {
  try {
    const quotes = await quoteService.getAllQuotes();
    res.json({
      success: true,
      data: quotes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching all quotes',
      error: error.message
    });
  }
});

// Add a new quote (admin endpoint)
router.post('/', async (req, res) => {
  try {
    const { text, author, category } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Quote text is required'
      });
    }

    const quote = await quoteService.addQuote({
      text,
      author: author || 'Anonymous',
      category: category || 'mental-health'
    });

    res.status(201).json({
      success: true,
      data: quote
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding quote',
      error: error.message
    });
  }
});

module.exports = router;