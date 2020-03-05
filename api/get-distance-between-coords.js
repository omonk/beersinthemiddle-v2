/**
 *
 * Taken from https://snipplr.com/view/25479/calculate-distance-between-two-points-with-latitude-and-longitude-coordinates
 *
 */

module.exports = ({ lat: lat1, lng: lon1 }, { lat: lat2, lng: lon2 }) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return Math.round(d * 1000);
};
