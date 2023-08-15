import sendRequest from "./send-request"

const BASE_URL = '/api/category'

export default function getAllCategories() {
    return sendRequest(`${BASE_URL}/all`)
}