import { http, HttpResponse } from 'msw';

import { BASE_URL, ENDPOINT } from '@/apis/url';
import { buildings } from '@/mocks/fixtures/buildingList';

export const buildingHandlers = [
  http.get(BASE_URL + ENDPOINT.BUILDING_LIST, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const size = parseInt(url.searchParams.get('size') || '10', 10);
    const subways = url.searchParams.getAll('subways');

    const filteredBuildings = buildings.filter(
      building => subways.length === 0 || subways.some(subway => building.station.name.includes(subway)),
    );

    const paginatedBuildings = filteredBuildings.slice((page - 1) * size, page * size);

    return HttpResponse.json({
      buildings: paginatedBuildings,
      page,
      size,
      totalPages: Math.ceil(filteredBuildings.length / size),
      totalElements: filteredBuildings.length,
    });
  }),
];
