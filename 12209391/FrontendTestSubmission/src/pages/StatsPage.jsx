import React, { useEffect, useState } from "react";
import {Log} from "../LoggingMiddleware/Log";
import { Container, Typography, Paper } from "@mui/material";

function StatsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortUrls") || "[]");
    setData(stored);
    Log("frontend", "info", "StatsPage", "Loaded analytics", {
      count: stored.length,
    });
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      {data.map((item) => (
        <Paper key={item.code} style={{ padding: 10, marginBottom: 10 }}>
          <Typography>
            Short: {window.location.origin}/{item.code}
          </Typography>
          <Typography>Original: {item.longUrl}</Typography>
          <Typography>
            Created: {new Date(item.createdAt).toLocaleString()}
          </Typography>
          <Typography>
            Expires: {new Date(item.expiresAt).toLocaleString()}
          </Typography>
          <Typography>Total Clicks: {item.clicks.length}</Typography>
        </Paper>
      ))}
    </Container>
  );
}

export default StatsPage;
