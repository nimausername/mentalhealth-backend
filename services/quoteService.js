const axios = require('axios');
const mongoose = require('mongoose');
const Quote = require('../models/Quote');

// Force refresh - Updated at 22:52

// Predefined quotes for mental health and men's mental health
const predefinedQuotes = [
  {
    text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    author: "Unknown",
    category: "mental-health"
  },
];

class QuoteService {
  // Get a random predefined quote
  getRandomPredefinedQuote() {
    const randomIndex = Math.floor(Math.random() * predefinedQuotes.length);
    return predefinedQuotes[randomIndex];
  }

  // Generate a quote using Gemini API (if API key is provided)
  async generateAIQuote() {
    if (!process.env.Gemini_API_KEY || process.env.Gemini_API_KEY === 'your_gemini_api_key_here') {
      console.log('Gemini API key not configured - falling back to predefined quote');
      return null;
    }

    try {
      const prompt = `Generate a short, inspiring quote about mental health or men's mental health. The quote should be encouraging and supportive for someone going through difficult times. Focus on themes of resilience, hope, and self-care. Return only the quote text without any additional formatting or explanation.`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.Gemini_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 100,
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data && response.data.candidates && response.data.candidates.length > 0) {
        const generatedText = response.data.candidates[0].content.parts[0].text.trim();
        return {
          text: generatedText,
          author: "Gemini AI",
          category: "mental-health"
        };
      }
    } catch (error) {
      console.error('Error generating AI quote with Gemini:', error.message);
      if (error.response) {
        console.error('Gemini API error response:', error.response.data);
      }
      return null;
    }

    return null;
  }

  // Get today's quote or create a new one
  async getTodayQuote() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      // Check if MongoDB is connected
      if (mongoose.connection.readyState !== 1) {
        return this.getRandomPredefinedQuote();
      }
      
      // Check if we already have a quote for today
      let todayQuote = await Quote.findOne({
        date: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        },
        isDailyQuote: true
      });

      if (!todayQuote) {
        // Try to generate an AI quote first
        let aiQuote = await this.generateAIQuote();
        
        // If AI quote generation fails, use a predefined quote
        if (!aiQuote) {
          aiQuote = this.getRandomPredefinedQuote();
        }

        // Create and save the new quote
        todayQuote = new Quote({
          text: aiQuote.text,
          author: aiQuote.author,
          category: aiQuote.category,
          date: today,
          isDailyQuote: true
        });

        await todayQuote.save();
      }

      return todayQuote;
    } catch (error) {
      console.error('Error getting today\'s quote:', error.message);
      // Fallback to a predefined quote
      return this.getRandomPredefinedQuote();
    }
  }

  // Get all quotes (for admin purposes)
  async getAllQuotes() {
    try {
      return await Quote.find().sort({ date: -1 });
    } catch (error) {
      console.error('Error getting all quotes:', error.message);
      return [];
    }
  }

  // Add a new quote manually
  async addQuote(quoteData) {
    try {
      const quote = new Quote(quoteData);
      return await quote.save();
    } catch (error) {
      console.error('Error adding quote:', error.message);
      throw error;
    }
  }
}

module.exports = new QuoteService();