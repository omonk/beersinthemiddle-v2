const Get = require('lodash.get');
const { titleCase } = require('change-case');
const atob = require('atob');
const { v4: uuid } = require('uuid');
const distanceBetweenTwoCoords = require('./get-distance-between-coords');
const chunk = require('lodash.chunk');
const { Client } = require('@elastic/elasticsearch');
const fetch = require('node-fetch');

const es = new Client({
  cloud: {
    id: process.env.BITMELASTICSEARCH_ID,
  },
  auth: {
    username: process.env.BITMELASTICSEARCH_USERNAME,
    password: process.env.BITMELASTICSEARCH_PASSWORD,
  },
});

const index = async ({ lat, lng, recommendations, locations, res }) => {
  // lol this is so so bad
  const origins = chunk(
    atob(locations)
      .split(',')
      .map(l => Number(l)),
    2,
  ).map(([lat, lon]) => ({ lat, lon }));

  try {
    await es.index({
      index: 'recommendations',
      body: {
        id: uuid(),
        publishedAt: new Date().toJSON(),
        average_lat_lng: { lat, lon: lng },
        origins,
        recommendations: recommendations.map(({ title, id }) => ({ title, id })),
      },
    });
  } catch (error) {
    // console.log(JSON.stringify({ error }, null, 2));
    // // res.status(500);
    // // res.setHeader('Content-Type', 'application/json');
    // // return error;
    //
  }
};

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAPS,
  Promise,
});

const isProd = process.env.NODE_ENV === 'production';

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
  const { lat, lng, radius = 250, keyword, locations } = req.query;

  return Promise.all(
    keyword.split(',').map(keyword => {
      return fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${process.env.GMAPS}&location=${lat},${lng}&radius=${radius}&keyword=${keyword}&type=${keyword}`,
        { headers: { 'Content-Type': 'application/json' } },
      ).then(r => r.json());
    }),
  )
    .then(response => {
      const { results } = response.reduce((acc, result) => {
        return { ...acc, ...result };
      }, []);
      return formatResponse(results, { lat, lng });
    })
    .then(async recommendations => {
      isProd && (await index({ lat, lng, recommendations, locations, res }));

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ recommendations }));
    })
    .catch(err => {
      console.log('ERROR', err);
      res.status(500);
      res.send(err);
    });
};
