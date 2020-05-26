import { FILTERS } from './constants';

function getRouteIds(routes) {
  return routes.map(route => route.id);
}

export default async function getRoutes() {
  // 'place-north' is North Station, type = 2 is commuter rail, so get all
  // commuter rail routes out of North Station
  const response = await fetch(`https://api-v3.mbta.com/routes?${FILTERS.NORTH_STATION}&${FILTERS.COMMUTER_RAIL}`);
  const data = await response.json();
  return getRouteIds(data.data);
}
