require('dotenv').config();
const express = require('express');

const port = 4000;

const app = express();

const bodyParser = require('body-parser');
const getFourSquareRecommendations = require('./services/get-four-square-recommendations');

app.use(bodyParser.json());
app.use(express.static('build'));
app.get('/api/foursquare', getFourSquareRecommendations);

app.listen(port, '0.0.0.0', () => {
  console.log(`BITM Server running on http://0.0.0.0:${port}`);
});
