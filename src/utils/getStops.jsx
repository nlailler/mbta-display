function parseStops(stops) {
  const stopIdToTrackNumber = {};
  const mapStopIdToTrackNumber = (acc, cur) => {
    acc[cur.id] = cur.attributes.platform_code;
    return acc;
  };
  return stops.reduce(mapStopIdToTrackNumber, stopIdToTrackNumber);
}

export default async function getStops(predictions) {
  const predictionIds = predictions.map(prediction => prediction.id).filter(id => id);
  if(predictionIds.length === 0) {
    return {};
  }
  const uniqueStopIds = new Set(predictionIds);
  const stopFilter = uniqueStopIds.join(',');

  const response = await fetch(`https://api-v3.mbta.com/stops/?filter[id]=${stopFilter}`);
  const data = await response.json();
  return parseStops(data.data);
}
