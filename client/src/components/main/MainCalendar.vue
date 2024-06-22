<template>
    <div class="main-calendar">
        <v-calendar
            :attributes="attributeByDate"
            borderless
            expanded
            transparent
            trim-weeks
            @click="selectDateByBox"
            @dayclick="selectDate"
        >
        </v-calendar>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    props: {
        modelValue: { type: String },
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
            const dates = new Date(this.modelValue);
            return [
                {
                    dates,
                    highlight: true,
                },
            ];
        },
    },
    methods: {
        ...mapMutations("journal", ["SELECT_DATE"]),
        selectDateByBox({ target: { classList } }) {
            if (classList.contains("vc-day")) {
                const pattern = /id-([\w-]+)/;
                const id = classList.value.match(pattern);
                console.log(id);
            }
            // const pattern = /id-([\w-]+)/;
            // const id = className.match(pattern)?.[1];
            // if (id) {
            //     this.selectDate({ id });
            // }
        },
        selectDate({ id }) {
            this.$emit("update:modelValue", id);
        },
    },
};
</script>

<style scoped></style>
