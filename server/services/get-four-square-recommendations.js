const fetch = require('node-fetch');
const { get } = require('lodash');

const fetchOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  method: 'get',
};

const fourSquareCredentials = `client_id=${
  process.env.FOURSQUARE_API_CLIENT
}&client_secret=${process.env.FOURSQUARE_API_SECRET}`;

const fourSquareBaseUrl = 'https://api.foursquare.com/v2';

const getVenueExploreParams = (ll, section = 'drinks') =>
  `?ll=${ll}&${fourSquareCredentials}&v=20170509&section=${section}&sortByDistance=1&limit=15`;

const getFourSquareRecommendations = ll => {
  const url = `${fourSquareBaseUrl}/venues/explore${getVenueExploreParams(ll)}`;
  return fetch(url, fetchOptions).then(res => res.json());
};

const formatFourSquareResponse = venues =>
  venues.map(item => ({
    title: get(item, 'name', 'N/A'),
    id: get(item, 'id', 'N/A'),
    location: {
      address: get(item, 'location.formattedAddress', ['N/A']),
      lat: get(item, 'location.lat', 'N/A'),
      lng: get(item, 'location.lng', 'N/A'),
    },
    url: get(item, 'url', 'N/A'),
    price: {
      priceRange: get(item, 'price.tier', 'N/A'),
    },
    rating: get(item, 'rating', 'N/A'),
    categories: get(item, 'categories', []).map(category => category.shortName),
    hours: {
      status: get(item, 'hours.status', 'N/A'),
      isOpen: get(item, 'hours.isOpen', 'N/A'),
    },
  }));

const getVenueDetails = ({ response }) => {
  const url = id =>
    `${fourSquareBaseUrl}/venues/${id}?${fourSquareCredentials}&v=20170509`;

  const ids = response.groups[0].items.map(item => item.venue.id);

  return ids.map(id =>
    fetch(url(id), fetchOptions)
      .then(res => res.json())
      .then(res => res.response.venue)
  );
};

module.exports = (req, res) => {
  const { ll } = req.query;
  return getFourSquareRecommendations(ll)
    .then(res => Promise.all(getVenueDetails(res)))
    .then(formatFourSquareResponse)
    .then(response => res.send(response))
    .catch(err => {
      console.log(`Error: ${err}`);
      res.status(500).json({ error: err.toString() });
    });
};
