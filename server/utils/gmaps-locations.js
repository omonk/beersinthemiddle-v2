require('dotenv').config();
const fetch = require('node-fetch');
const { get } = require('lodash');

const moment = require('moment-timezone');
const momentDurationFormatSetup = require('moment-duration-format');

momentDurationFormatSetup(moment);
console.log(moment.duration(1305, 'seconds').format('h [hrs], m [min]'));

// const locations = [
//   {
//     lat: 51.5073509,
//     lng: -0.12775829999998223,
//   },
//   {
//     lat: 51.4612794,
//     lng: -0.11561480000000302,
//   },
//   {
//     lat: 51.46131099999999,
//     lng: -0.3037420000000566,
//   },
// ];

const locations = [
  {
    address: 'Brixton, London, UK',
    lat: 51.4612794,
    lng: -0.11561480000000302,
    placeId: 'ChIJ0fUEMjkEdkgRkcf2eo-_Kdk',
  },
  {
    address: 'Peckham, London, UK',
    lat: 51.474191,
    lng: -0.06913699999995515,
    placeId: 'ChIJTcNKP6cDdkgRKAPfDcz_IWU',
  },
  {
    address: 'Tottenham Hale, London, UK',
    lat: 51.58868349999999,
    lng: -0.05995810000001711,
    placeId: 'ChIJd2YAyCUcdkgRc5WwmOQBpy4',
  },
];

const midPoint = {
  lat: 51.48431530675587,
  lng: -0.1216834827836015,
};

const gmapsUrl = params =>
  `https://maps.googleapis.com/maps/api/directions/json?${params}&mode=transit&key=${
    process.env.GOOGLE_MAPS_API_KEY
  }`;

const getTravelTimes = response => {
  return response
    .map(r => {
      const leg = get(r, 'routes[0].legs[0]', undefined);
      console.log({ leg });
      return {
        duration: leg.duration.value,
        lat: leg.start_location.lat,
        lng: leg.start_location.lng,
      };
    })
    .sort((a, b) => a.duration - b.duration);
};

const validateTimes = journeys => {
  console.log({ journeys });
  const times = journeys.map(journey => journey.duration);
  const total = times.length;

  const range = journeys[total - 1].duration - journeys[0].duration;
  const rangeEitherSide = range / 2;
  const average = times.reduce((a, b) => a + b, 0) / total;

  console.log({ range, average, rangeEitherSide });
  const withinRange = i => i.duration;
  journeys.map(withinRange);
  return journeys;
};

const getTimings = locations => {
  const midPointValues = Object.values(midPoint).join(',');

  return Promise.all(
    locations.map(location => {
      const params = `origin=${Object.values(location).join(
        ','
      )}&destination=${midPointValues}`;
      return fetch(gmapsUrl(params))
        .then(res => res.json())
        .catch(e => {
          throw new Error(e);
        });
    })
  )
    .then(response => getTravelTimes(response))
    .then(journeys => validateTimes(journeys));
  // .then(times => console.log(times));
};

getTimings(locations);
