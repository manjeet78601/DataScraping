const scraperService = require('../services/scraper.service');
const Item = require('../models/Item.model');

class MarketController {
    async triggerScrape(req, res, next) {
        try {
            const { keyword, category } = req.body;
            if (!keyword || !category) {
                return res.status(400).json({ success: false, error: 'Keyword and category are mandatory.' });
            }

            const result = await scraperService.executeScraping(keyword, category);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getStoredItems(req, res, next) {
        try {
            const { category } = req.query;
            const query = category ? { category } : {};
            const items = await Item.find(query).sort({ scrapedAt: -1 }).limit(50);
            return res.status(200).json({ success: true, count: items.length, data: items });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MarketController();
