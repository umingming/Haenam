import { createStore } from "vuex";
import journal from "./modules/journal.js";

export default createStore({
    state: {
        userId: "",
        loggedIn: false,
    },
    getters: {
        getUserId(state) {
            return state.userId;
        },
        isLoggedIn(state) {
            return state.loggedIn;
        },
    },
    actions: {},
    mutations: {
        SET_USER_ID(state, userId) {
            state.userId = userId;
        },
        SET_LOGIN_STATUS(state, loggedIn) {
            state.loggedIn = loggedIn;
            sessionStorage.setItem("loggedIn", loggedIn);
        },
    },
    modules: { journal },
});
