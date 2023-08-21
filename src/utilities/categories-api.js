import sendRequest from "./send-request"

const BASE_URL = '/api/category'

export function getAllCategories() {
    return sendRequest(`${BASE_URL}`)
}

export function getFilteredCategories() {
    return sendRequest(`${BASE_URL}/main`)
}