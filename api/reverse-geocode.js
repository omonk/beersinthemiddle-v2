const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS,
  Promise: Promise,
});

console.log({ p: process.env.GMAPS });
module.exports = (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    res.send(new Error('Missing lat or lng'));
  }

  return googleMapsClient
    .reverseGeocode({ latlng: { lat, lng } })
    .asPromise()
    .then(response => {
      const body = response.json.results[0];
      const address = body.formatted_address;
      const placeId = body.place_id;
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ address, placeId }));
    })
    .catch(err => {
      console.log(JSON.stringify({ err }, null, 2));
      res.status(404);
      res.send(err);
    });
};
