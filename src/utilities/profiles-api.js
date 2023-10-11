import sendRequest from './send-request';
const BASE_URL = '/api/profiles';

// Refactored code below
export function createProfile(accessToken) {
  return sendRequest(`${BASE_URL}/create`, 'POST', {accessToken});
}
 
export function getBackProfile() {
    return sendRequest(BASE_URL)
}

export async function getProfile() {
  const profile = await getBackProfile()
  return profile
}