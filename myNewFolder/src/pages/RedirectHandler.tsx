// src/pages/RedirectHandler.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUrlByShortcode, incrementClickCount } from '../storageService';

const RedirectHandler: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [message, setMessage] = useState('Checking link...');

  useEffect(() => {
    if (shortCode) {
      const urlData = getUrlByShortcode(shortCode);
      if (urlData) {
        if (new Date(urlData.expiresAt) < new Date()) {
          setMessage('Link has expired.');
        } else {
          incrementClickCount(shortCode);
          window.location.href = urlData.longUrl;
        }
      } else {
        setMessage('Link not found.');
      }
    }
  }, [shortCode]);

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <p>{message}</p>
    </div>
  );
};

export default RedirectHandler;