<template>
    <div>
        <div class="title">
            <button @click="updateDate(-1)">
                <i class="fa-solid fa-angle-left"></i>
            </button>
            <h2>{{ dailyFormat }}</h2>
            <button @click="updateDate(1)">
                <i class="fa-solid fa-angle-right"></i>
            </button>
        </div>
        <div>
            <div v-for="journal of dailyJournals" :key="journal._id">
                <input type="checkbox" v-model="journal.checked" />
                <input type="text" :id="journal._id" :value="journal.content" />
            </div>
            <div>
                <input type="text" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "MainView",
    data() {
        return {
            selectedDate: new Date(),
        };
    },
    computed: {
        ...mapGetters("journal", ["getJournals"]),
        dailyFormat() {
            const date = this.selectedDate || new Date();
            const formatDate = (date) => date.toISOString().slice(0, 10);

            return formatDate(date);
        },
        dailyJournals() {
            const journals = this.getJournals.filter((i) =>
                i.date.startsWith(this.dailyFormat)
            );
            return journals;
        },
    },
    methods: {
        updateDate(amount) {
            const date = this.selectedDate.getDate() + amount;
            this.selectedDate = new Date(this.selectedDate.setDate(date));
        },
    },
};
</script>

<style>
.title h2 {
    display: inline-block;
}
.title button {
    position: relative;
    top: -3px;
    background: none;
    border: none;
    margin: 0 8px;
    cursor: pointer;
    color: #c2c2c2;
}
.title button:hover {
    color: #44b365;
}
</style>
