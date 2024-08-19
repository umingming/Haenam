import { apiInstance } from "./index";
import { AuthConfig } from "@/types/userTypes";

function login(config: AuthConfig) {
    return apiInstance.post("/login", config);
}
function register(config: AuthConfig) {
    return apiInstance.post("/register", config);
}

export default { login, register };
