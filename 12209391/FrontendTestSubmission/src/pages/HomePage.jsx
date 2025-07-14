import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { Log } from '../../../LoggingMiddleware/log';
import {
  Container, TextField, Button, Typography, Paper
} from '@mui/material';

function HomePage() {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const shortenUrls = () => {
    const created = [];
    let allShorts = JSON.parse(localStorage.getItem('shortUrls') || '[]');

    for (let i = 0; i < urls.length; i++) {
      const { longUrl, validity, shortcode } = urls[i];
      if (!longUrl) continue;
      const isValidUrl = /^(http|https):\/\/.+/.test(longUrl);
      if (!isValidUrl) {
        Log("frontend", "error", "HomePage", "Invalid URL format", { longUrl });
        continue;
      }
      let code = shortcode || nanoid(5);
      while (allShorts.find(item => item.code === code)) {
        code = nanoid(5);
      }
      const minutes = validity ? parseInt(validity) : 30;
      const expiresAt = Date.now() + minutes * 60 * 1000;
      const entry = { code, longUrl, createdAt: Date.now(), expiresAt, clicks: [] };
      allShorts.push(entry);
      created.push(entry);
      Log("frontend", "info", "HomePage", "Shortened URL created", { code, longUrl });
    }
    localStorage.setItem("shortUrls", JSON.stringify(allShorts));
    setResults(created);
  };

  const addMore = () => {
    if (urls.length >= 5) return;
    setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {urls.map((url, idx) => (
        <Paper key={idx} style={{ padding: 10, marginBottom: 10 }}>
          <TextField label="Long URL" fullWidth value={url.longUrl} onChange={e => handleChange(idx, 'longUrl', e.target.value)} />
          <TextField label="Validity (minutes)" fullWidth value={url.validity} onChange={e => handleChange(idx, 'validity', e.target.value)} />
          <TextField label="Custom Shortcode" fullWidth value={url.shortcode} onChange={e => handleChange(idx, 'shortcode', e.target.value)} />
        </Paper>
      ))}
      <Button onClick={addMore}>+ Add URL</Button>
      <Button onClick={shortenUrls} variant="contained" color="primary">Shorten</Button>

      {results.map(r => (
        <Paper key={r.code} style={{ marginTop: 10, padding: 10 }}>
          <Typography>Short URL: <a href={`/${r.code}`}>{window.location.origin}/{r.code}</a></Typography>
          <Typography>Expires at: {new Date(r.expiresAt).toLocaleString()}</Typography>
        </Paper>
      ))}
    </Container>
  );
}

export default HomePage;
