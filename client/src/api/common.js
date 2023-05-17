import { apiInstance } from "./index.js";

function login(data) {
    return apiInstance.post("/api/login", data);
}
function register(data) {
    return apiInstance.post("/api/register", data);
}

export default { login, register };
