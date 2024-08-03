import { ACTION_KEY, BUTTON_KEY } from "./keyConstants";

export const BUTTON_CONFIGS = [
    {
        [BUTTON_KEY.ACTION]: ACTION_KEY.ADD,
        [BUTTON_KEY.ICON_CLASS]: "fa-solid fa-circle-plus",
    },
    {
        [BUTTON_KEY.ACTION]: ACTION_KEY.CLOSE,
        [BUTTON_KEY.ICON_CLASS]: "fa-solid fa-xmark",
    },
    {
        [BUTTON_KEY.ACTION]: ACTION_KEY.COPY,
        [BUTTON_KEY.TEXT]: "복사",
        [BUTTON_KEY.ICON_CLASS]: "fa-solid fa-clone",
    },
    {
        [BUTTON_KEY.ACTION]: ACTION_KEY.EDIT,
        [BUTTON_KEY.TEXT]: "수정",
        [BUTTON_KEY.ICON_CLASS]: "fa-solid fa-pen-to-square",
    },
    {
        [BUTTON_KEY.ACTION]: ACTION_KEY.ELLIPSIS,
        [BUTTON_KEY.ICON_CLASS]: "fa-solid fa-ellipsis-vertical",
    },
    {
        [BUTTON_KEY.ACTION]: ACTION_KEY.LEFT,
        [BUTTON_KEY.ICON_CLASS]: "fa-solid fa-angle-left",
    },
    {
        [BUTTON_KEY.ACTION]: ACTION_KEY.LOGIN,
        [BUTTON_KEY.TEXT]: "로그인",
        [BUTTON_KEY.ICON_CLASS]: "fa-solid fa-sign-in-alt",
    },
    {
        [BUTTON_KEY.ACTION]: ACTION_KEY.LOGOUT,
        [BUTTON_KEY.TEXT]: "로그아웃",
        [BUTTON_KEY.ICON_CLASS]: "fa-solid fa-sign-out-alt",
    },
    {
        [BUTTON_KEY.ACTION]: ACTION_KEY.REGISTER,
        [BUTTON_KEY.TEXT]: "회원가입",
        [BUTTON_KEY.ICON_CLASS]: "fa-solid fa-user-plus",
    },
    {
        [BUTTON_KEY.ACTION]: ACTION_KEY.REMOVE,
        [BUTTON_KEY.TEXT]: "삭제",
        [BUTTON_KEY.ICON_CLASS]: "fa-solid fa-trash-can",
    },
    {
        [BUTTON_KEY.ACTION]: ACTION_KEY.RIGHT,
        [BUTTON_KEY.ICON_CLASS]: "fa-solid fa-angle-right",
    },
];
