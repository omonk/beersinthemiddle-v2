require('dotenv').config();
const fetch = require('node-fetch');
const { get } = require('lodash');
const { median } = require('mathjs');
const moment = require('moment-timezone');
const momentDurationFormatSetup = require('moment-duration-format');
const { destVincenty, calculateBearing } = require('./coordinate-calculations');
momentDurationFormatSetup(moment);

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

// const locations = [
//   {
//     address: 'Brixton, London, UK',
//     lat: 51.4612794,
//     lng: -0.11561480000000302,
//     placeId: 'ChIJ0fUEMjkEdkgRkcf2eo-_Kdk',
//   },
//   {
//     address: 'Peckham, London, UK',
//     lat: 51.474191,
//     lng: -0.06913699999995515,
//     placeId: 'ChIJTcNKP6cDdkgRKAPfDcz_IWU',
//   },
//   {
//     address: 'Tottenham Hale, London, UK',
//     lat: 51.58868349999999,
//     lng: -0.05995810000001711,
//     placeId: 'ChIJd2YAyCUcdkgRc5WwmOQBpy4',
//   },
// ];

const locations = [
  {
    address: '41 Criffel Ave, London SW2 4AY, UK',
    lat: 51.4412722,
    lng: -0.13112849999999998,
    placeId: 'ChIJa1pKHjAEdkgRX-9W5q0snVI',
  },
  {
    address: 'balham',
    lat: 51.4428311,
    lng: -0.15261409999993703,
    placeId: null,
  },
  {
    address: 'Forest Hill, London, UK',
    lat: 51.4397781,
    lng: -0.054641599999968093,
    placeId: 'ChIJ6RB0ZMEDdkgRmN417WcjuRs',
  },
  {
    address: 'Brixton, London, UK',
    lat: 51.4612794,
    lng: -0.11561480000000302,
    placeId: 'ChIJ0fUEMjkEdkgRkcf2eo-_Kdk',
  },
  {
    address: 'Acton, London, UK',
    lat: 51.5084214,
    lng: -0.2745505000000321,
    placeId: 'ChIJT3dT5xwOdkgRxyJUcCnsIEQ',
  },
];

const midPoint = {
  lat: 51.468445548460366,
  lng: -0.11447927525283325,
};

const gmapsUrl = params =>
  `https://maps.googleapis.com/maps/api/directions/json?${params}&mode=transit&key=${
    process.env.GOOGLE_MAPS_API_KEY
  }`;

const getTravelTimes = response => {
  return response.map(({ directions, location }) => {
    const leg = get(directions, 'routes[0].legs[0]', undefined);
    return {
      duration: leg.duration.value,
      lat: leg.start_location.lat,
      lng: leg.start_location.lng,
      distanceToMidPoint: leg.distance.value,
    };
  });
};

const validateTimes = journeys => {
  const times = journeys.map(journey => journey.duration);
  const timesMedians = median(times);
  const upperBound = timesMedians + timesMedians;

  // 2x Standard Deviation
  const anomaly = journeys.reduce((acc, curr) => {
    if (curr.duration > upperBound) {
      return acc.concat([{ ...curr }]);
    }
    return acc;
  }, []);

  return { journeys, anomaly };
};

const fetchTravelTimes = (locations, midPoint) => {
  const destination = Object.values(midPoint).join(',');
  return locations.map(location => {
    const params = `origin=${Object.values(location).join(
      ','
    )}&destination=${destination}`;
    return fetch(gmapsUrl(params))
      .then(res => res.json())
      .then(res => ({
        directions: res,
        location,
      }))
      .catch(e => {
        throw new Error(e);
      });
  });
};

const getTimings = (locations, midPoint) =>
  Promise.all(fetchTravelTimes(locations, midPoint))
    .then(response => getTravelTimes(response))
    .then(journeys => validateTimes(journeys))
    .then(journeys => {
      // console.log(JSON.stringify(journeys, null, 2));
      if (!journeys) {
        throw new Error(`Journeys missing`);
      }
      if (journeys && journeys.anomaly) {
        const {
          lat: anomalyLat,
          lng: anomalyLng,
          distanceToMidPoint,
        } = journeys.anomaly[0];
        const { lat: midPointLat, lng: midPointLng } = midPoint;

        // I think theres something wrong with this calculation
        const bearingMidPointToAnomaly = calculateBearing(
          anomalyLat,
          anomalyLng,
          midPointLat,
          midPointLng
        );

        // Using this new midpoint we can recalculate the travel times to try
        // and make sure the travel distances are standadised for most locations🤞🏼
        const newMidPoint = destVincenty(
          midPointLat,
          midPointLng,
          bearingMidPointToAnomaly,
          (distanceToMidPoint / 100) * 10 // Move towards anomaly - 10%
        );

        console.log({ newMidPoint, midPointLat, midPointLng });
      }
      return journeys;
    });

getTimings(locations, midPoint);
