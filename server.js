const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Send www traffic to the main domain so search engines see one copy of the site
app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host.toLowerCase().startsWith('www.')) {
    return res.redirect(301, `https://${host.slice(4)}${req.originalUrl}`);
  }
  next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all: serve index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Premiere Outdoor Movies - NJ/Philly server running on port ${PORT}`);
});
