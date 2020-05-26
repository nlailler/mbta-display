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

export default async function getPredictions() {
  const response = await fetch(`https://api-v3.mbta.com/predictions?filter[stop]=place-north&filter[direction_id]=0&include=stop&filter[route_type]=2`);
  const data = await response.json();
  return parsePredictions(data.data);
}
