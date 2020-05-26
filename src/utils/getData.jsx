import getRoutes from './getRoutes';
import getTrips from './getTrips';
import getSchedules from './getSchedules';
import getPredictionsAndStops from './getPredictionsAndStops';
import { CARRIERS, STATUS, TBD, NORTH_STATION } from './constants';

function parseData(
  { tripIdToTrip, scheduleIdToSchedule, tripIdToPrediction, stopIdToTrackNumber },
) {
  const schedules = Object.keys(scheduleIdToSchedule).map(scheduleId => {
    const schedule = scheduleIdToSchedule[scheduleId];
    const { tripId } = schedule;
    const trip = tripIdToTrip[tripId];
    
    // Assume no news is good news.
    const prediction = tripIdToPrediction[tripId] || { status: STATUS.ON_TIME };
    const { stopId } = prediction;
    return {
      carrier: CARRIERS.MBTA,
      time: prediction.departure || schedule.departure,
      datetime: prediction.departureDatetime || schedule.departureDatetime,
      destination: trip.destination,
      trainNumber: trip.trainNumber,
      trackNumber: !stopId || stopId === NORTH_STATION
        ? TBD : stopIdToTrackNumber[stopId],
      status: prediction.status.toUpperCase(),
    };
  });
  return schedules;
}

export default async function getData() {
  const routeIds = await getRoutes();
  const routeFilter = routeIds.join(',');
  const { tripIdToPrediction, stopIdToTrackNumber } = await getPredictionsAndStops();

  // We could put the routes into a config file since they don't change often but
  // it's fast enough to dynamically retrieve them.
  const tripIdToTrip = await getTrips(routeFilter);
  const scheduleIdToSchedule = await getSchedules(routeFilter);

  return parseData({
    tripIdToTrip,
    scheduleIdToSchedule,
    tripIdToPrediction,
    stopIdToTrackNumber,
  });
}
