import sendRequest from './send-request';
const BASE_URL = '/api/profiles';

// Refactored code below
export function createProfile(accessToken) {
  return sendRequest(`${BASE_URL}/create`, 'POST', {accessToken});
}
 
export function getProfile() {
    return sendRequest(BASE_URL) || null
}

