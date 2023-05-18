import { createStore } from "vuex";
import journal from "./modules/journal.js";

export default createStore({
    state: {
        userId: "",
    },
    getters: {
        getUserId(state) {
            return state.userId;
        },
    },
    actions: {},
    mutations: {
        SET_USER_ID(state, data) {
            state.userId = data;
        },
    },
    modules: { journal },
});
