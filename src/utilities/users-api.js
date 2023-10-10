import sendRequest from './send-request';
import {sendStringRequest} from './send-request';
const BASE_URL = '/api/users';

// Refactored code below
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function addAccessToken(accessToken) {
  return sendRequest(`${BASE_URL}/add-spotify-token`, 'POST', {accessToken});
}

export function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`)
}