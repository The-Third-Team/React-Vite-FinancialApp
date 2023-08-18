import sendRequest from "./send-request";

const BASE_URL = '/api/budget'

export function getUserBudget(userID) {
    return sendRequest(`${BASE_URL}/user/${userID}`)
}

export function createUserBudget(budgetData) {
    return sendRequest(BASE_URL, 'POST', budgetData)
}

// http://localhost:3001/api/budget/bulk

export function updateBudget(budgetData){
    return sendRequest(`${BASE_URL}/bulk `, 'PUT', budgetData)
}