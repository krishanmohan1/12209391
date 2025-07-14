// src/components/URLStats.jsx
import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const URLStats = ({ urlData }) => {
  return (
    <div>
      <Typography variant="h6">
        Short URL: <a href={`/${urlData.shortcode}`} target="_blank" rel="noreferrer">
          http://localhost:3000/{urlData.shortcode}
        </a>
      </Typography>
      <Typography>
        Original URL: {urlData.url}
        <br />
        Created: {new Date(urlData.createdAt).toLocaleString()}
        <br />
        Expires: {new Date(urlData.expiresAt).toLocaleString()}
        <br />
        Total Clicks: {urlData.clicks.length}
      </Typography>
      <Typography variant="subtitle1" style={{ marginTop: '0.5rem' }}>Click Details:</Typography>
      {urlData.clicks.length === 0 ? (
        <Typography>No clicks yet.</Typography>
      ) : (
        <List dense>
          {urlData.clicks.map((click, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`[${new Date(click.timestamp).toLocaleString()}]`}
                secondary={`Source: ${click.source}, Location: ${click.location}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default URLStats;
