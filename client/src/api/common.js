import { apiInstance } from "./index.js";

function login(data) {
    return apiInstance.post("/login", data);
}
function register(data) {
    return apiInstance.post("/register", data);
}

export default { login, register };
