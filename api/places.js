const Get = require('lodash.get');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS,
  Promise: Promise,
});

const formatResponse = venues => venues =>
  venues.map(item => ({
    title: Get(item, 'name', 'N/A'),
    id: Get(item, 'id', 'N/A'),
    location: {
      address: Get(item, 'location.formattedAddress', ['N/A']),
      lat: Get(item, 'location.lat', 'N/A'),
      lng: Get(item, 'location.lng', 'N/A'),
    },
    url: Get(item, 'url', 'N/A'),
    price: {
      priceRange: Get(item, 'price.tier', 'N/A'),
    },
    rating: Get(item, 'rating', 'N/A'),
    categories: Get(item, 'categories', []).map(category => category.shortName),
    hours: {
      status: Get(item, 'hours.status', 'N/A'),
      isOpen: Get(item, 'hours.isOpen', 'N/A'),
    },
  }));

module.exports = (req, res) => {
  const { lat, lng, radius = 1000 } = req.query;
  const type = ['bar', 'cafe', 'restaurant', 'night_club'].join(',');

  return googleMapsClient
    .placesNearby({ location: { lat, lng }, radius, type: 'bar' })
    .asPromise()
    .then(({ json }) => {})
    .then(({ json }) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ ...json }));
    })
    .catch(err => {
      console.log('ERROR', err);
      res.status(500);
      res.send(err);
    });
};
