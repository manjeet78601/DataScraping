const express = require('express');
const router = express.Router();
const marketController = require('../controllers/market.controller');

router.post('/scrape', marketController.triggerScrape);
router.get('/items', marketController.getStoredItems);

module.exports = router;
