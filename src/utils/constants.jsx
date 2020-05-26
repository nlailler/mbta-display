export const TBD = 'TBD';

export const STATUS = {
  ON_TIME: 'ON TIME'
};
Object.freeze(STATUS);

export const CARRIERS = {
  MBTA: 'MBTA',
};
Object.freeze(CARRIERS);

export const NORTH_STATION = 'North Station';

export const FILTERS = {
  NORTH_STATION: 'filter[stop]=place-north',
  DEPARTURES:'filter[direction_id]=0',
  COMMUTER_RAIL: 'filter[type]=2',
  // This is the same refernce value as the above COMMUTER_RAIL but non-route
  // endpoints use route_type instead of type as the filter name.
  ROUTE_TYPES: {
    'COMMUTER_RAIL': 'filter[route_type]=2',
  }
};
Object.freeze(FILTERS);
