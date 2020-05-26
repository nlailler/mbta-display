import getRoutes from './getRoutes';
import getTrips from './getTrips';
import getSchedules from './getSchedules';
import getPredictions from './getPredictions';
import getStops from './getStops';
import { CARRIERS, TBD } from './constants';

function parseData(
  { tripIdToTrip, scheduleIdToSchedule, scheduleIdToPrediction, stopIdToTrackNumber },
) {
  const schedules = Object.keys(scheduleIdToSchedule).map(scheduleId => {
    const schedule = scheduleIdToSchedule[scheduleId];
    const prediction = scheduleIdToPrediction[scheduleId];
    const { tripId } = schedule;
    const trip = tripIdToTrip[tripId];
    const { stopId } = prediction;
    return {
      carrier: CARRIERS.MBTA,
      time: prediction.departure || schedule.departure,
      datetime: prediction.departureDatetime || schedule.departureDatetime,
      destination: trip.destination,
      trainNumber: trip.trainNumber,
      trackNumber: stopId === TBD ? TBD : stopIdToTrackNumber[stopId],
      status: prediction.status,
    };
  });
  return schedules;
}

export default async function getData() {
  const routeIds = await getRoutes();
  const routeFilter = routeIds.join(',');
  const tripIdToTrip = await getTrips(routeFilter);
  const scheduleIdToSchedule = await getSchedules(routeFilter);
  const scheduleIdToPrediction = await getPredictions(scheduleIdToSchedule);
  const stopIdToTrackNumber = getStops(Object.values(scheduleIdToPrediction));
  return parseData({
    tripIdToTrip,
    scheduleIdToSchedule,
    scheduleIdToPrediction,
    stopIdToTrackNumber,
  });
}
