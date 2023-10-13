import sendRequest from './send-request';
const BASE_URL = '/api/profiles';

// Refactored code below
export function createProfile(accessToken, refreshToken) {
  return sendRequest(`${BASE_URL}/create`, 'POST', {accessToken, refreshToken});
}
 
export function getBackProfile() {
    return sendRequest(BASE_URL)
}

export async function getProfile() {
  const profile = await getBackProfile()
  return profile
}

export function updateToken (accessToken, refreshToken) {
  return sendRequest(`${BASE_URL}/token/update`, 'POST', {accessToken, refreshToken});
}

export function addUserInfo(form) {
  return sendRequest(`${BASE_URL}/add-user-info`, 'POST', {form});
}

export async function createTopPlaylist (data) {
  return sendRequest(`${BASE_URL}/playlist/add-top`, 'POST', {data});

}

export async function getQueue () {
  return sendRequest(`${BASE_URL}/queue`)
}

export async function sendDislike (id) {
  return sendRequest(`${BASE_URL}/dislike`, 'POST', {id})
}

export async function sendLike (id) {
  return sendRequest(`${BASE_URL}/like`, 'POST', {id})
}

export async function sendMatch (id) {
  return sendRequest(`${BASE_URL}/match`, 'POST', {id})
}