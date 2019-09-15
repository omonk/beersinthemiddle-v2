const get = require('lodash.get');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS,
  Promise,
});

const formatResponse = venues => {
  return venues.map(item => ({
    title: get(item, 'name', undefined),
    id: get(item, 'place_id', undefined),
    location: {
      address: get(item, 'vicinity', undefined),
      lat: get(item, 'geometry.location.lat', undefined),
      lng: get(item, 'geometry.location.lng', undefined),
    },
    url: get(item, 'url', undefined),
    price: {
      priceRange: get(item, 'price_level', undefined),
    },
    rating: get(item, 'rating', 'N/A'),
    types: get(item, 'types', []).filter(i => !['point_of_interest', 'establishment'].includes(i)),
    hours: {
      openNow: get(item, 'opening_hours.open_now', undefined),
    },
    permanentlyClosed: get(item, 'permanently_closed', false),
  }));
};

module.exports = async (req, res) => {
  const { lat, lng, radius = 500, keyword } = req.query;

  const places = keyword
    .split(',')
    .map(keyword => googleMapsClient.placesNearby({ location: { lat, lng }, radius, keyword }).asPromise());

  return Promise.all(places)
    .then(response => {
      const { results } = response.reduce((acc, { json }) => ({ ...acc, ...json }), []);
      return formatResponse(results);
    })
    .then(recommendations => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ recommendations }));
    })
    .catch(err => {
      console.log('ERROR', err);
      res.status(500);
      res.send(err);
    });
};
