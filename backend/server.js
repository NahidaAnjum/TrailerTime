const express = require('express');
const bodyParser = require('body-parser');
const trailerRoutes = require('./routes/trailerRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/trailers', trailerRoutes);

// Set port to 5001 or any other unused port if 5000 is in use
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
