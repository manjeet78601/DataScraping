const API_BASE_URL = 'http://localhost:5000/api/v1/market';

export const triggerScrapingAPI = async (keyword, category) => {
    const response = await fetch(`${API_BASE_URL}/scrape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, category })
    });
    return response.json();
};

export const fetchStoredItemsAPI = async (category = '') => {
    const response = await fetch(`${API_BASE_URL}/items?category=${category}`);
    return response.json();
};
