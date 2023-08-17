import sendRequest from "./send-request";

const BASE_URL = '/api/transaction'

export function getUserTransactions(userID) {
    return sendRequest(`${BASE_URL}/user/${userID}`)
}

export function getAccountTransactions(accountId) {
    return sendRequest(`${BASE_URL}/account/${accountId}`)
}