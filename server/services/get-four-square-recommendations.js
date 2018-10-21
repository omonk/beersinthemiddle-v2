const fetch = require('node-fetch');
const { get } = require('lodash');

const getParamsWithLL = ll =>
  `?ll=${ll}&client_id=${process.env.FOURSQUARE_API_CLIENT}&client_secret=${
    process.env.FOURSQUARE_API_SECRET
  }&v=20170509&section=drinks&sortByDistance=1`;

const getFourSquareRecommendations = ll => {
  const baseUrl = 'https://api.foursquare.com/v2/venues/explore';
  const url = `${baseUrl}${getParamsWithLL(ll)}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
  };

  return fetch(url, options).then(res => res.json());
};

const formatFourSquareResponse = data => {
  const venues = data.response.groups[0];

  return venues.items.map(item => ({
    title: get(item, 'venue.name', 'N/A'),
    location: {
      address: get(item, 'venue.location.formattedAddress', ['N/A']),
      lat: get(item, 'venue.location.lat', 'N/A'),
      lng: get(item, 'venue.location.lng', 'N/A'),
    },
    url: get(item, 'venue.url', 'N/A'),
    price: {
      priceRange: get(item, 'venue.price.tier', 'N/A'),
    },
    rating: get(item, 'venue.rating', 'N/A'),
    categories: get(item, 'venue.categories', []).map(
      category => category.shortName
    ),
    hours: {
      status: get(item, 'venue.hours.status', 'N/A'),
      isOpen: get(item, 'venue.hours.isOpen', 'N/A'),
    },
  }));
};

module.exports = (req, res) => {
  const { ll } = req.query;

  console.log(ll);
  return getFourSquareRecommendations(ll)
    .then(formatFourSquareResponse)
    .then(response => res.send({ response }))
    .catch(err => {
      console.log(`Error: ${err}`);
      res.status(500).json({ error: err.toString() });
    });
};
