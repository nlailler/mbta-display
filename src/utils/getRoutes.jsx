function getRouteIds(routes) {
  return routes.map(route => route.id);
}

export default async function getRoutes() {
  const response = await fetch('https://api-v3.mbta.com/routes?filter[stop]=place-north&filter[type]=2');
  const data = await response.json();
  return getRouteIds(data.data);
}
