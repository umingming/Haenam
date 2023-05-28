<template>
    <div class="main-calendar">
        <v-calendar
            trim-weeks
            transparent
            borderless
            expanded
            :attributes="formattedJournals"
            @dayclick="selectDate"
            @click="selectDateByBox"
        >
            <template v-slot:day-content="{ day, attributes }">
                <div :class="{ on: isSelected(day) }">
                    {{ day.day }}
                </div>
                <div v-for="({ journal }, index) in attributes" :key="index">
                    {{ journal.content }}
                </div>
            </template>
        </v-calendar>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    components: {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters("journal", ["getJournals", "getSelectedDate"]),
        isSelected() {
            return ({ id }) => {
                return id === this.getSelectedDate;
            };
        },
        formattedJournals() {
            const formatJournal = (journal) => ({
                dates: new Date(journal.date),
                journal,
            });
            const journals = this.getJournals.map((i) => formatJournal(i));
            return journals;
        },
        attributeByDate() {
            const dates = new Date(this.getSelectedDate);
            return [
                {
                    dates,
                    customData: "test1",
                },
            ];
        },
    },
    methods: {
        ...mapMutations("journal", ["SELECT_DATE"]),
        selectDateByBox({ target: { className } }) {
            const pattern = /id-([\w-]+)/;
            const id = className.match(pattern)?.[1];
            if (id) {
                this.selectDate({ id });
            }
        },
        selectDate({ id }) {
            this.SELECT_DATE(id);
        },
    },
};
</script>

<style scoped></style>
