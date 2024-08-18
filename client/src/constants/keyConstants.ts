export const ACTION_KEY = {
    ADD: "add",
    CLOSE: "close",
    COPY: "copy",
    EDIT: "edit",
    ELLIPSIS: "ellipsis",
    LEFT: "left",
    LOGIN: "login",
    LOGOUT: "logout",
    REGISTER: "register",
    REMOVE: "remove",
    RIGHT: "right",
} as const;

export const BUTTON_KEY = {
    ACTION: "action",
    TEXT: "text",
    ICON_CLASS: "iconClass",
} as const;

export const AUTH_KEY = {
    ID: "id",
    PW: "pw",
} as const;

export const USER_KEY = {
    ID: "user_id",
    LOGGED_IN: "loggedIn",
} as const;

export const JOURNAL_KEY = {
    ID: "_id",
    CONTENT: "content",
    DATE: "date",
    USER_ID: USER_KEY.ID,
} as const;
