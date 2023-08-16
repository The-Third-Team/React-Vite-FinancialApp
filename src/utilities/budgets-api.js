import sendRequest from "./send-request";

const BASE_URL = 'api/budget'

export function getUserBudget(userID) {
    return sendRequest(`${BASE_URL}/user/${userID}`)
}
