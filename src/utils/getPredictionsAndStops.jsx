import moment from 'moment';

function parsePredictions(predictions) {
  const tripIdToPrediction = {};
  const mapTripIdToPrediction = (acc, cur) => {
    const departureTime = cur.attributes.departure_time;
    const departureDatetime = departureTime ? moment(departureTime) :  null;
    acc[cur.relationships.trip.data.id] = {
      departure: departureDatetime ? departureDatetime.format('h:mm a') : null,
      departureDatetime,
      status: cur.attributes.status,
      stopId: cur.relationships.stop.data.id,
    };
    return acc;
  };
  return predictions.reduce(mapTripIdToPrediction, tripIdToPrediction);
}

function parseStops(stops) {
  const stopIdToTrackNumber = {};
  const mapStopIdToTrackNumber = (acc, cur) => {
    acc[cur.id] = cur.attributes.platform_code;
    return acc;
  };
  return stops.reduce(mapStopIdToTrackNumber, stopIdToTrackNumber);
}

export default async function getPredictionsAndStops() {
  // By adding 'include=stop' we can get the relevant stop information too which is nice.
  const response = await fetch(`https://api-v3.mbta.com/predictions?filter[stop]=place-north&filter[direction_id]=0&filter[route_type]=2&include=stop`);
  const data = await response.json();
  const { data: predictionData, included: stopData } = data;
  return {
    tripIdToPrediction: parsePredictions(predictionData),
    stopIdToTrackNumber: parseStops(stopData),
  };
}
