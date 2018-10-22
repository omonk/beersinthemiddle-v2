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
  `?ll=${ll}&${fourSquareCredentials}&v=20170509&section=${section}&sortByDistance=1`;

const getFourSquareRecommendations = ll => {
  const url = `${fourSquareBaseUrl}/venues/explore${getVenueExploreParams(ll)}`;
  console.log(url);

  return fetch(url, fetchOptions).then(res => res.json());
};

const formatFourSquareResponse = data => {
  console.log(JSON.stringify(data, null, 2));
  const venues = data.response.groups[0];

  return venues.items.map(item => ({
    title: get(item, 'venue.name', 'N/A'),
    id: get(item, 'venue.id', 'N/A'),
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

const getVenueDetails = ({ response }) => {
  // console.log(response.groups[0].items.map());
  const url = id =>
    `${fourSquareBaseUrl}/venues/${id}?${fourSquareCredentials}`;

  return response.groups[0].items.map(item => {
    console.log(url(item.id));
    return fetch(url(item.id), fetchOptions);
  });
};

module.exports = (req, res) => {
  const { ll } = req.query;
  return (
    getFourSquareRecommendations(ll)
      .then(res => Promise.all(getVenueDetails(res)))
      .then(formatFourSquareResponse)
      .then(response => res.send({ response }))
      .catch(err => {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: err.toString() });
      })
  );
};
