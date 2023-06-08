import journal from "@/api/journal.js";
import { reactive } from "vue";

const state = reactive({
    journals: [],
    selectedJournal: {},
    selectedDate: new Date().toISOString().slice(0, 10),
});

const getters = {
    getJournals(state) {
        return JSON.parse(JSON.stringify(state.journals));
    },
    getSelectedJournal(state) {
        return state.selectedJournal;
    },
    getSelectedDate(state) {
        return state.selectedDate;
    },
};

const actions = {
    async FETCH_JOURNALS({ commit }) {
        try {
            const userId =
                sessionStorage.getItem("userId") ||
                localStorage.getItem("userId");
            const { data } = await journal.get({ user_id: userId });
            if (data) {
                commit("SET_JOURNALS", data);
            }
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async ADD_JOURNAL({ commit }, param) {
        try {
            const userId =
                sessionStorage.getItem("userId") ||
                localStorage.getItem("userId");
            const { data } = await journal.add({ user_id: userId, ...param });
            commit("ADD_JOURNAL", data[0]);
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async EDIT_JOURNAL({ commit }, param) {
        try {
            const { data } = await journal.edit(param);
            commit("EDIT_JOURNAL", data);
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async REMOVE_JOURNAL({ commit }, id) {
        try {
            const { data } = await journal.remove(id);
            commit("REMOVE_JOURNAL", id);
            return data;
        } catch (error) {
            console.log(error);
        }
    },
};

const mutations = {
    SET_JOURNALS(state, data) {
        state.journals = data;
    },
    ADD_JOURNAL(state, data) {
        state.journals.push(data);
    },
    EDIT_JOURNAL(state, data) {
        const { _id } = data;
        const index = state.journals.findIndex((i) => i._id === _id);
        state.journals[index] = data;
        state.selectedJournal = state.journals[index];
    },
    REMOVE_JOURNAL(state, _id) {
        const index = state.journals.findIndex((i) => i._id == _id);
        if (index > -1) state.journals.splice(index, 1);
    },
    SELECT_JOURNAL(state, data) {
        state.selectedJournal = data;
    },
    SELECT_DATE(state, data) {
        state.selectedDate = data;
    },
    UPDATE_JOURNAL_INDEX(state, { fromIndex, toIndex }) {
        const journal = state.journals.splice(fromIndex, 1)[0];
        state.journals.splice(toIndex, 0, journal);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
