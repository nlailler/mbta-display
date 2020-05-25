function isSubway(schedule) {
  return schedule.relationships.route.data.id === 'Orange'
    || schedule.relationships.route.data.id === 'Green-B'
    || schedule.relationships.route.data.id === 'Green-C'
    || schedule.relationships.route.data.id === 'Green-D'
    || schedule.relationships.route.data.id === 'Green-E';
}

function parseData(data) {
  const schedules = data.data;
  const commuterRailSchedules = schedules.filter(ele => !isSubway(ele));
  return commuterRailSchedules.map(schedule => ({
    carrier: 'AMTRACK',
    time: schedule.attributes.departure,
    destination: schedule.relationships.route.data.id,
    trainNumber: '1234',
    trackNumber: 'TBD',
    status: 'ON TIME'
  }));
}

export default async function getData() {
  const response = await fetch('https://api-v3.mbta.com/schedules?include=prediction&filter[min_time]=00%3A00&filter[max_time]=23%3A55&filter[stop]=place-north&filter[direction_id]=0');
  const data = await response.json();
  console.log(parseData(data));
  return parseData(data);
}
