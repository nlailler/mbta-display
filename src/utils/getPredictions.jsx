import moment from 'moment';
import { STATUS, TBD } from './constants';

function parsePredictions(predictions) {
  const predictionIdToPrediction = {};
  const mapPredictionIdToPrediction = (acc, cur) => {
    const departureDatetime = moment(cur.attributes.departure_time);
    acc[cur.id] = {
      departure: departureDatetime.format('h:mm a'),
      departureDatetime,
      status: cur.attributes.status,
      stopId: cur.relationships.stop.data.id,
    };
    return acc;
  };
  return predictions.reduce(mapPredictionIdToPrediction, predictionIdToPrediction);
}

function handleSchedules({ scheduleIdToSchedule, predictionIdToPrediction }) {
  const scheduleIdToPrediction = {};
  const mapScheduleIdToPrediction = (acc, cur) => {
    const { predictionId } = scheduleIdToSchedule[cur];
    if(predictionId) {
      const prediction = predictionIdToPrediction[predictionId];
      acc[cur] = {
        departure: prediction.attributes.departure_time,
        status: prediction.attributes.status,
        stopId: prediction.relationships.stop.data.id,
      };
    } else {
      acc[cur] = {
        departure: null,
        status: STATUS.ON_TIME,
        stopId: TBD,
      };
    }
    return acc;
  };
  return Object.keys(scheduleIdToSchedule).reduce(mapScheduleIdToPrediction, scheduleIdToPrediction);
}

export default async function getPredictionsFromSchedules(scheduleIdToSchedule) {
  const predictionIds = Object.values(scheduleIdToSchedule).map(schedule => schedule.predictionId);
  const filteredPredictionIds = predictionIds.filter(id => id);
  let predictionIdToPredictions = {};
  if(filteredPredictionIds.length > 0) {
    const predictionFilter = filteredPredictionIds.length === 1
      ? filteredPredictionIds[0]
      : predictionIds.filter(id => id).join(',');
    const response = await fetch(`https://api-v3.mbta.com/predictions?filter[stop]=place-north&filter[prediction]=${predictionFilter}`);
    const data = await response.json();
    predictionIdToPredictions = parsePredictions(data.data);
  }
  return handleSchedules({ scheduleIdToSchedule, predictionIdToPredictions });
}
