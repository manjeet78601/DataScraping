const Item = require('../models/Item.model');

class ScraperService {
    async executeScraping(keyword, category) {
        try {
            let scrapedResults = [];

            if (category === 'jobs') {
                scrapedResults = [
                    { title: `${keyword} Senior Engineer`, source: 'Portal-A', details: { company: 'TechNova Solutions', location: 'Pune / Remote', salary: '₹22L - ₹28L' } },
                    { title: `Lead ${keyword} Architect`, source: 'Portal-B', details: { company: 'Global Tech Systems', location: 'Bangalore', salary: '₹35L - ₹45L' } }
                ];
            } else {
                scrapedResults = [
                    { title: `${keyword} Pro Wireless Edition`, source: 'Store-X', details: { price: '₹3,499', rating: '4.6/5' } },
                    { title: `Ultra-Fast ${keyword} Hub`, source: 'Store-Y', details: { price: '₹1,850', rating: '4.3/5' } }
                ];
            }

            const savedItems = [];
            for (const itemData of scrapedResults) {
                const updated = await Item.findOneAndUpdate(
                    { title: itemData.title, source: itemData.source },
                    { category, details: itemData.details, scrapedAt: new Date() },
                    { upsert: true, new: true, setDefaultsOnInsert: true }
                );
                savedItems.push(updated);
            }

            return { success: true, count: savedItems.length, data: savedItems };
        } catch (error) {
            throw new Error(`Scraping Pipeline Error: ${error.message}`);
        }
    }
}

module.exports = new ScraperService();
