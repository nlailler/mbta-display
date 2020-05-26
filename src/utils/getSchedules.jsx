import moment from 'moment';
import { FILTERS } from './constants';

function parseSchedules(schedules) {
  const scheduleIdToSchedule = {};
  const mapScheduleIdToSchedule = (acc, cur) => {
    const departureDatetime = moment(cur.attributes.departure_time);
    acc[cur.id] = {
      departure: departureDatetime.format('h:mm a'),
      departureDatetime, // Used for easy sorting
      predictionId: cur.relationships.prediction.data ? cur.relationships.prediction.data.id : null,
      tripId: cur.relationships.trip.data.id,
    };
    return acc;
  };
  return schedules.reduce(mapScheduleIdToSchedule, scheduleIdToSchedule);
}

export default async function getTrips(routeFilter) {
  const today = moment().format('YYYY-MM-DD');
  // Get all departure schedules out of north station for the given routes.
  const response = await fetch(`https://api-v3.mbta.com/schedules?${FILTERS.NORTH_STATION}&filter[route]=${routeFilter}&filter[date]=${today}&${FILTERS.DEPARTURES}&include=prediction`);
  const data = await response.json();
  return parseSchedules(data.data);
}
