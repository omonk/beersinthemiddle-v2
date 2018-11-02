import getLatLngMidpoint from './get-lat-lng-midpoint';

describe('get-lat-lng-midpoint', () => {
  it('should correctly calculate a set of lat/lng average', () => {
    const locations = [
      {
        lat: 20,
        lng: 20,
      },
      {
        lat: 10,
        lng: 10,
      },
    ];

    const expected = {
      lat: 15.054670903122675,
      lng: 14.88248913028353,
    };

    expect(getLatLngMidpoint(locations)).toEqual(expected);
  });

  it('should return an error when passed locations are incorrect', () => {
    const undefinedLocations = [];
    function getInvalidUndefined() {
      getLatLngMidpoint(undefinedLocations);
    }

    const malformedLocations = [
      {
        lat: 312,
        lng: undefined,
      },
    ];

    function getInvalidMalformed() {
      getLatLngMidpoint(malformedLocations);
    }

    expect(getInvalidUndefined).toThrowError();
    expect(getInvalidMalformed).toThrowError();
  });
});
