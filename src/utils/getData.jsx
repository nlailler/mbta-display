import getRoutes from './getRoutes';
import getTrips from './getTrips';
import getSchedules from './getSchedules';
import getPredictions from './getPredictions';
import getStops from './getStops';
import { CARRIERS, STATUS, TBD, NORTH_STATION } from './constants';

function parseData(
  { tripIdToTrip, scheduleIdToSchedule, tripIdToPrediction, stopIdToTrackNumber },
) {
  const schedules = Object.keys(scheduleIdToSchedule).map(scheduleId => {
    const schedule = scheduleIdToSchedule[scheduleId];
    const { tripId } = schedule;
    const trip = tripIdToTrip[tripId];
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
  const tripIdToPrediction = await getPredictions();
  const tripIdToTrip = await getTrips(routeFilter);
  const scheduleIdToSchedule = await getSchedules(routeFilter);
  const stopIdToTrackNumber = await getStops(Object.values(tripIdToPrediction));
  return parseData({
    tripIdToTrip,
    scheduleIdToSchedule,
    tripIdToPrediction,
    stopIdToTrackNumber,
  });
}
