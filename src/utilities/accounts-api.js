import sendRequest from "./send-request";

const BASE_URL = '/api/account'

export function getUserAccounts(userId) {
    return sendRequest(`${BASE_URL}/user/${userId}`)
}