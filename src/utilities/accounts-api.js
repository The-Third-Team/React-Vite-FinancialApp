import sendRequest from "./send-request";

const BASE_URL = '/api/account'

export async function getUserAccountBalance(userID) {
    return sendRequest(`${BASE_URL}/user/${userID}`)
}

export async function getUserBalance(accountID){
    return sendRequest(`${BASE_URL}/balance/${accountID}`)
}
