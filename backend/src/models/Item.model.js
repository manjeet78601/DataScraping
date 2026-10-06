const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true, index: true },
    category: { type: String, required: true, enum: ['jobs', 'ecommerce'] },
    source: { type: String, required: true },
    details: {
        company: String,
        location: String,
        salary: String,
        price: String,
        rating: String
    },
    scrapedAt: { type: Date, default: Date.now }
});

itemSchema.index({ title: 1, source: 1 }, { unique: true });

module.exports = mongoose.model('Item', itemSchema);
