import { httpClient } from './httpClient';
import { launchApi } from './launchApi';

export function apiFactory(http) {
  return {
    launches: launchApi(http)
  };
}

const http = httpClient('https://api.spacexdata.com/v3/launches');
export const api = apiFactory(http);
