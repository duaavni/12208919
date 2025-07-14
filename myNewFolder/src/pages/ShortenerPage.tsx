
import React, { useState } from 'react';
import { saveUrl, UrlData } from '../storageService';
import { Log } from '../logger';

interface Props {
  authToken: string;
}

const ShortenerPage: React.FC<Props> = ({ authToken }) => {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validity, setValidity] = useState('30');
  const [result, setResult] = useState<UrlData | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    // Basic URL validation
    if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
      setError('Please enter a valid URL (must start with http:// or https://).');
      Log(authToken, 'error', 'component', 'Invalid URL format from user');
      return;
    }

    const shortCode = customCode.trim() || Math.random().toString(36).substring(2, 8);
    const expiresAt = new Date(Date.now() + (parseInt(validity) || 30) * 60 * 1000).toISOString();
    
    const saved = saveUrl({ longUrl, shortCode, expiresAt });

    if (saved) {
      setResult(saved);
      Log(authToken, 'info', 'component', `URL shortened: ${shortCode}`);
    } else {
      setError(`The shortcode '${shortCode}' is already in use.`);
      Log(authToken, 'error', 'component', `Shortcode collision: ${shortCode}`);
    }
  };

  return (
    <div className="form-container">
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Custom shortcode (optional)"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />
        <input
          type="number"
          placeholder="Validity in minutes (default 30)"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>

      {error && <p className="error">{error}</p>}
      
      {result && (
        <div className="result">
          <p>Short URL Created:</p>
          <a href={`/${result.shortCode}`} target="_blank" rel="noopener noreferrer">
            {`${window.location.origin}/${result.shortCode}`}
          </a>
          <p><small>Expires: {new Date(result.expiresAt).toLocaleString()}</small></p>
        </div>
      )}
    </div>
  );
};

export default ShortenerPage;