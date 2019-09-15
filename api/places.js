const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS,
  Promise,
});

module.exports = (req, res) => {
  const { lat, lng, radius = 1000 } = req.query;

  return googleMapsClient
    .placesNearby({ location: { lat, lng }, radius, type: 'bar' })
    .asPromise()
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
