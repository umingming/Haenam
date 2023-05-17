<template>
    <div>
        <div>
            <h2>{{ dailyIso }}</h2>
        </div>
        <div v-for="journal of dailyJournals" :key="journal._id">
            <input type="checkbox" v-model="journal.checked" />
            <input type="text" :id="journal._id" :value="journal.content" />
        </div>
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
    methods: {
        ...mapActions("journal", [
            "ADD_JOURNAL",
            "EDIT_JOURNAL",
            "REMOVE_JOURNAL",
            "SELECT_JOURNAL",
        ]),
    },
};
</script>

<style></style>
