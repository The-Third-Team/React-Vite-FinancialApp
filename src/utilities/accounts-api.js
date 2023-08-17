import sendRequest from "./send-request";

const BASE_URL = '/api/account'

const BASE_URL2 = '/api/transaction'

export async function getUserAccounts(userID) {
    return sendRequest(`${BASE_URL}/user/${userID}`)
}

export async function getUserBalance(accountID){
    return sendRequest(`${BASE_URL}/balance/${accountID}`)
}

/// should be moved to transactions.api

export async function getUserIncome(userId, categoryId){
    return sendRequest(`${BASE_URL2}/user/${userId}/category/${categoryId}`)
}

