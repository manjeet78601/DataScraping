import React, { useState, useEffect } from 'react';
import { triggerScrapingAPI, fetchStoredItemsAPI } from './api/marketApi';
import './App.css';

function App() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('jobs');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const loadData = async (cat = category) => {
    try {
      const res = await fetchStoredItemsAPI(cat);
      if (res.success) setItems(res.data);
    } catch (err) {
      setError('Could not connect to database backend.');
    }
  };

  useEffect(() => {
    loadData(category);
  }, [category]);

  const handleScrape = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setError('');

    try {
      const result = await triggerScrapingAPI(keyword, category);
      if (result.success) {
        await loadData(category);
        setKeyword('');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Scraping service failed to respond.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enterprise-layout">
      <header className="app-header">
        <h1>⚡ MarketPulse Enterprise</h1>
        <p>Real-Time Data Ingestion & Intelligence Dashboard</p>
      </header>

      <div className="container">
        <form onSubmit={handleScrape} className="control-panel">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field">
            <option value="jobs">💼 Job Intelligence</option>
            <option value="ecommerce">🛒 E-Commerce Tracking</option>
          </select>
          <input 
            type="text" 
            placeholder="Enter search keyword (e.g. React, Python, Laptop)..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="input-field grow"
          />

          <button type="submit" disabled={loading} className="action-btn">
            {loading ? 'Processing Pipeline...' : 'Run Scraper'}
          </button>
        </form>

        {error && <div className="error-box">{error}</div>}

        <div className="results-wrapper">
          <h2>Indexed Records ({items.length})</h2>
          <div className="cards-grid">
            {items.map((item) => (
              <div key={item._id} className="enterprise-card">
                <h3>{item.title}</h3>
                {item.category === 'jobs' ? (
                  <>
                    <p>🏢 <strong>{item.details?.company}</strong></p>
                    <p>📍 {item.details?.location}</p>
                    <p>💰 {item.details?.salary}</p>
                  </>
                ) : (
                  <>
                    <p>🏷️ <strong>{item.details?.price}</strong></p>
                    <p>⭐ {item.details?.rating}</p>
                  </>
                )}
                <span className="badge">Source: {item.source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
