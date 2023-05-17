<template>
    <div>
        <div>
            <h2>{{ dailyIso }}</h2>
        </div>
        <div v-for="journal of dailyJournals" :key="journal._id"></div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "MainView",
    data() {
        return {
            selectedDate: new Date(),
        };
    },
    computed: {
        ...mapGetters("journal", ["getJournals", "getSelectedJournal"]),
        dailyIso() {
            const date = this.selectedDate || new Date();
            return date.toISOString().substring(0, 10);
        },
        dailyJournals() {
            const journals = this.getJournals.filter((i) =>
                i.date.startsWith(this.dailyIso)
            );
            return journals;
        },
    },
    created() {
        this.init();
    },
    methods: {
        ...mapActions("journal", [
            "FETCH_JOURNALS",
            "ADD_JOURNAL",
            "EDIT_JOURNAL",
            "REMOVE_JOURNAL",
            "SELECT_JOURNAL",
        ]),
        async init() {
            await this.FETCH_JOURNALS();
        },
    },
};
</script>

<style></style>
