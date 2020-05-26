import moment from 'moment';

function parseTrips(trips) {
  const tripIdToDestinationAndTrainNumber = {};
  const mapTripIdToTrip = (acc, cur) => {
    acc[cur.id] = {
      trainNumber: cur.attributes.name,
      destination: cur.attributes.headsign,
    };
    return acc;
  };
  return trips.reduce(mapTripIdToTrip, tripIdToDestinationAndTrainNumber);
}

export default async function getTrips(routeFilter) {
  const today = moment().format('YYYY-MM-DD');
  const response = await fetch(`https://api-v3.mbta.com/trips/?filter[date]=${today}&filter[route]=${routeFilter}&filter[direction_id]=0`);
  const data = await response.json();
  return parseTrips(data.data);
}
