import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Log } from '../../../LoggingMiddleware/log';
import { faker } from '@faker-js/faker';

function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shortUrls') || '[]');
    const target = stored.find(e => e.code === shortcode);
    if (!target || Date.now() > target.expiresAt) {
      Log("frontend", "error", "RedirectPage", "Invalid or expired shortcode", { shortcode });
      navigate('/');
    } else {
      target.clicks.push({
        timestamp: Date.now(),
        source: navigator.userAgent,
        location: faker.location.country(),
      });
      localStorage.setItem("shortUrls", JSON.stringify(stored));
      Log("frontend", "info", "RedirectPage", "Redirecting to original URL", { shortcode });
      window.location.href = target.longUrl;
    }
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
}

export default RedirectPage;
