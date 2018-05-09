export default class ApiError extends Error {
    constructor(response) {
        super(`Received ${response.status} ${response.statusText} from the API, please try again later`);
        this.response = response;
    }
}
