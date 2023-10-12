import sendRequest from './send-request';
const BASE_URL = '/api/playlist';

// Refactored code below
export async function createTopPlaylist (data) {
  return sendRequest(`${BASE_URL}/top/create`, 'POST', {data});
}

export async function createMyPlaylist (data) {
  return sendRequest(`${BASE_URL}/create`, 'POST', {data});
}

export async function getPlaylist () {
  return sendRequest(`${BASE_URL}`);
}

export async function addFeatures (features) {
  return sendRequest(`${BASE_URL}/add-features`, 'POST', {features});
}