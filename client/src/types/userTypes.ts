import { AUTH_KEY, USER_KEY } from "@/constants/keyConstants";

export interface AuthConfig {
    [AUTH_KEY.ID]: string;
    [AUTH_KEY.PW]: string;
}

export interface UserConfig {
    [USER_KEY.ID]: string;
    [USER_KEY.LOGGED_IN]?: boolean;
}
