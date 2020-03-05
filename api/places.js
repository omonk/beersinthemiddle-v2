const Get = require('lodash.get');
const { titleCase } = require('change-case');
const distanceBetweenTwoCoords = require('./get-distance-between-coords');

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS,
  Promise,
});

const formatResponse = (venues, origin) => {
  return venues
    .map(item => ({
      title: Get(item, 'name', undefined),
      id: Get(item, 'place_id', undefined),
      location: {
        address: Get(item, 'vicinity', undefined),
        lat: Get(item, 'geometry.location.lat', undefined),
        lng: Get(item, 'geometry.location.lng', undefined),
      },
      url: Get(item, 'url', undefined),
      price: {
        priceRange: Get(item, 'price_level', undefined),
      },
      rating: Get(item, 'rating', 'N/A'),
      types: Get(item, 'types', []).reduce(
        (acc, curr) =>
          ['point_of_interest', 'establishment'].includes(curr)
            ? acc
            : acc.concat([
                {
                  name: curr,
                  label: titleCase(curr),
                },
              ]),
        [],
      ),
      hours: {
        openNow: Get(item, 'opening_hours.open_now', undefined),
      },
      permanentlyClosed: Get(item, 'permanently_closed', false),
      distanceFromCenter: distanceBetweenTwoCoords(origin, {
        lat: Get(item, 'geometry.location.lat', undefined),
        lng: Get(item, 'geometry.location.lng', undefined),
      }),
    }))
    .sort((a, b) => a.distanceFromCenter - b.distanceFromCenter);
};

module.exports = async (req, res) => {
  const { lat, lng, radius = 500, keyword } = req.query;

  const places = keyword
    .split(',')
    .map(keyword => googleMapsClient.placesNearby({ location: { lat, lng }, radius, keyword }).asPromise());

  return Promise.all(places)
    .then(response => {
      const { results } = response.reduce((acc, { json }) => ({ ...acc, ...json }), []);
      return formatResponse(results, { lat, lng });
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
