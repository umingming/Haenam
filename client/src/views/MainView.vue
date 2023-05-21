<template>
    <div id="main" class="box">
        <header>
            <h1 id="logo">{{ logo }}</h1>
            <base-button name="signOut" @click="signOut"></base-button>
        </header>
        <div class="title">
            <base-button name="left" @click="updateDate(-1)"></base-button>
            <h2>{{ dailyFormat }}</h2>
            <base-button name="right" @click="updateDate(1)"></base-button>
        </div>
        <div class="journal-list">
            <div
                v-for="journal of dailyJournals"
                :key="journal._id"
                class="journal"
                :class="{ on: isSelectedJournal(journal) }"
            >
                <base-button name="edit" @click="editJournal()"></base-button>
                <input
                    type="checkbox"
                    v-model="journal.checked"
                    @change="editJournal(journal)"
                />
                <input
                    type="text"
                    :data-id="journal._id"
                    v-model="journal.content"
                    @focus="selectJournal(journal)"
                    @keyup.enter="editJournal()"
                    @keyup.backspace="handleBackspaceInput"
                />
                <base-button
                    name="remove"
                    @click="removeJournal(journal._id)"
                ></base-button>
            </div>
        </div>
        <div class="journal pending">
            <base-button name="add" @click="addJournal"></base-button>
            <input type="text" id="pending-journal" @keyup.enter="addJournal" />
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import BaseButton from "@/components/base/BaseButton.vue";
export default {
    name: "MainView",
    components: {
        BaseButton,
    },
    data() {
        return {
            selectedDate: new Date(),
            selectedJournal: {},
        };
    },
    computed: {
        ...mapState(["userId"]),
        ...mapGetters("journal", ["getJournals"]),
        dailyFormat() {
            const formatDate = (date) => date.toISOString().slice(0, 10);

            return formatDate(this.selectedDate);
        },
        dailyJournals() {
            const journals = this.getJournals.filter((i) =>
                i?.date.startsWith(this.dailyFormat)
            );
            return journals;
        },
        isSelectedJournal() {
            return ({ _id }) => this.selectedJournal._id == _id;
        },
        logo() {
            const incompleteJournals = this.dailyJournals.filter(
                (i) => !i.checked
            );
            const allJournalsCompleted =
                this.dailyJournals.length !== 0 &&
                incompleteJournals.length === 0;

            return allJournalsCompleted ? "해냄!" : "해냄?";
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
        ]),
        init() {
            this.FETCH_JOURNALS();
        },
        updateDate(amount) {
            const date = this.selectedDate.getDate() + amount;
            this.selectedDate = new Date(this.selectedDate.setDate(date));
        },
        async addJournal() {
            const $input = document.querySelector("#pending-journal");
            if (!$input?.value) return;

            try {
                const param = {
                    content: $input.value,
                    date: this.selectedDate,
                };
                await this.ADD_JOURNAL(param);
                $input.value = "";
            } catch (error) {
                console.log(error);
            }
        },
        async editJournal(journal) {
            const { _id, content, checked } = journal || this.selectedJournal;

            try {
                await this.EDIT_JOURNAL({ _id, content, checked });
                if (!journal) this.deselectJournal();
            } catch (error) {
                console.log(error);
            }
        },
        handleBackspaceInput({ target: { dataset, value }, repeat }) {
            if (!repeat && !value) this.removeJournal(dataset.id);
        },
        async removeJournal(id) {
            try {
                await this.REMOVE_JOURNAL(id);
            } catch (error) {
                console.log(error);
            }
        },
        selectJournal(journal) {
            this.selectedJournal = journal;
        },
        deselectJournal() {
            const { _id } = this.selectedJournal;
            const $input = document.querySelector(`[data-id="${_id}"]`);
            $input.blur();

            this.selectedJournal = {};
        },
        signOut() {
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push("/auth");
        },
    },
};
</script>

<style scoped>
.title h2 {
    display: inline-block;
}
.title button {
    position: relative;
    top: -3px;
    margin: 0 8px;
    font-size: 30px;
}
.journal-list {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 450px;
    max-height: 70%;
    overflow-y: scroll;
}
.journal-list::-webkit-scrollbar {
    cursor: pointer;
    width: 8px;
}
.journal-list::-webkit-scrollbar-thumb {
    background: rgba(73, 120, 250, 0.303) !important;
    border-radius: 5px;
}
.journal {
    height: 30px;
}
.journal input[type="checkbox"] {
    transform: translate(-3px, 2px);
    z-index: 1;
    accent-color: rgb(73, 120, 250);
    cursor: pointer;
}
.journal input[type="text"] {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.108);
    line-height: 20px;
    outline: none;
    width: 90%;
}
.journal input[type="text"]:focus {
    border-bottom: 1px solid black;
}
.button-edit {
    position: absolute;
    transform: translate(-5.5px, 2.5px);
    font-size: 15px;
    z-index: -1;
    opacity: 0;
}
.journal.on .button-edit {
    z-index: 1;
    opacity: 1;
}
.journal.on input[type="checkbox"] {
    opacity: 0;
}
.button-remove {
    display: none;
}
.journal:hover .button-remove {
    position: absolute;
    display: inline-block;
    transform: translateY(2px);
}
.journal.pending {
    margin-top: 10px;
}
.journal.pending input {
    width: 450px;
}
.button-add {
    position: relative;
    left: -5px;
    width: 20px;
}
</style>
