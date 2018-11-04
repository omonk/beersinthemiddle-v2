require('dotenv').config();
const express = require('express');

const port = 4000;

const app = express();

const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const getFourSquareRecommendations = require('./services/get-four-square-recommendations');
const getAddressFromLatLng = require('./services/get-address-from-lat-lng');

app.use(bodyParser.json());
app.use(express.static('build'));
app.get('/api/foursquare', getFourSquareRecommendations);
app.get('/api/reverse-geocode', getAddressFromLatLng);
app.use(history({ verbose: true }));

app.listen(port, '0.0.0.0', () => {
  console.log(`BITM Server running on http://0.0.0.0:${port}`);
});
