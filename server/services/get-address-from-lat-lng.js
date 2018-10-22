console.log(process.env.GOOGLE_MAPS_API_KEY);
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise: Promise,
});

module.exports = (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    res.send(new Error('Missing lat or lng'));
  }

  googleMapsClient
    .reverseGeocode({ latlng: { lat, lng } })
    .asPromise()
    .then(response => {
      console.log(JSON.stringify(response.json.results[0], null, 2));
      const body = response.json.results[0];
      const address = body.formatted_address;
      const placeId = body.place_id;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ address, placeId }));
    })
    .catch(err => {
      if (err === 'timeout') {
        res.send('timeout');
      }
    });
};
