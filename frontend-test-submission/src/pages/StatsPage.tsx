import React, { useState, useEffect } from 'react';
import { getUrls, UrlData } from '../storageService';
import { Log } from '../logger';

interface Props {
  authToken: string;
}

const StatsPage: React.FC<Props> = ({ authToken }) => {
  const [urls, setUrls] = useState<UrlData[]>([]);

  useEffect(() => {
    setUrls(getUrls());
    Log(authToken, 'info', 'page', 'Statistics page viewed');
  }, [authToken]);

  return (
    <div className="page-container">
      <h2>Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Clicks</th>
            <th>Expires</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url.id}>
              <td>
                <a href={`/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
                  {url.shortCode}
                </a>
              </td>
              <td>{url.longUrl}</td>
              <td>{url.clicks.length}</td>
              <td>{new Date(url.expiresAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsPage;