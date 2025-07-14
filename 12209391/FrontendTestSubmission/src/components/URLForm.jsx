// src/components/URLForm.jsx
import React, { useState } from 'react';
import { Grid, TextField, Button, Typography } from '@mui/material';
import { nanoid } from 'nanoid';

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const URLForm = ({ onShorten }) => {
  const [inputs, setInputs] = useState([
    { id: nanoid(), url: '', shortcode: '', validity: '' },
  ]);

  const handleChange = (id, field, value) => {
    setInputs((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAdd = () => {
    if (inputs.length < 5) {
      setInputs((prev) => [...prev, { id: nanoid(), url: '', shortcode: '', validity: '' }]);
    }
  };

  const handleSubmit = () => {
    try {
      const data = inputs.map((item) => {
        if (!isValidURL(item.url)) throw new Error('Invalid URL provided.');
        return {
          ...item,
          validity: item.validity ? parseInt(item.validity) : 30,
          shortcode: item.shortcode || nanoid(5),
        };
      });
      onShorten(data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Grid container spacing={2} direction="column">
      {inputs.map((item, index) => (
        <Grid item key={item.id}>
          <Typography variant="subtitle1">URL #{index + 1}</Typography>
          <TextField
            label="Long URL"
            value={item.url}
            fullWidth
            onChange={(e) => handleChange(item.id, 'url', e.target.value)}
            margin="dense"
          />
          <TextField
            label="Custom Shortcode (optional)"
            value={item.shortcode}
            fullWidth
            onChange={(e) => handleChange(item.id, 'shortcode', e.target.value)}
            margin="dense"
          />
          <TextField
            label="Validity in minutes (optional)"
            value={item.validity}
            fullWidth
            onChange={(e) => handleChange(item.id, 'validity', e.target.value)}
            margin="dense"
            type="number"
          />
        </Grid>
      ))}
      <Grid item>
        <Button
          variant="outlined"
          onClick={handleAdd}
          disabled={inputs.length >= 5}
        >
          Add Another URL
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Shorten URLs
        </Button>
      </Grid>
    </Grid>
  );
};

export default URLForm;
