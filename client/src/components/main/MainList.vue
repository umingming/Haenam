<template>
    <div class="main-list">
        <div class="title">
            <h2>{{ getSelectedDate }}</h2>
        </div>
        <div class="journal-list">
            <draggable
                v-bind="{ animation: 150 }"
                :list="dailyJournals"
                @end="updateJournalIndex"
            >
                <template #item="{ element }">
                    <div
                        class="journal"
                        :class="{ on: isSelectedJournal(element) }"
                    >
                        <base-button-option></base-button-option>
                        <input
                            type="checkbox"
                            v-model="element.checked"
                            @change="editJournal(element)"
                        />
                        <input
                            type="text"
                            :value="element.content"
                            :data-id="element._id"
                            :readonly="true"
                            @focus="selectJournal(element)"
                            @dblclick="startEditing"
                            @blur="finishEditing"
                            @keyup.enter="updateInputValue"
                            @keyup.backspace="handleBackspaceInput"
                        />
                    </div>
                </template>
            </draggable>
        </div>
        <div class="pending">
            <base-button name="add" @onClick="addJournal"></base-button>
            <input type="text" id="pending-journal" @keyup.enter="addJournal" />
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseButtonOption from "@/components/base/BaseButtonOption.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
    components: {
        draggable,
        BaseButton,
        BaseButtonOption,
    },
    data() {
        return {
            selectedJournal: {},
            lastEventTime: 0,
            journals: [],
            isShowOptions: false,
        };
    },
    computed: {
        ...mapState(["userId"]),
        ...mapGetters("journal", ["getJournals", "getSelectedDate"]),
        dailyJournals() {
            const journals = this.getJournals.filter((i) =>
                i?.date.startsWith(this.getSelectedDate)
            );
            return journals;
        },
        isSelectedJournal() {
            return ({ _id }) => this.selectedJournal._id == _id;
        },
        logo() {
            const incompleteJournals = this.dailyJournals?.filter(
                (i) => !i.checked
            );
            const allJournalsCompleted =
                this.dailyJournals?.length !== 0 &&
                incompleteJournals?.length === 0;

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
        ...mapMutations("journal", ["UPDATE_JOURNAL_INDEX"]),
        init() {
            this.FETCH_JOURNALS();
        },
        updateDate(amount) {
            const date = this.selectedDate.getDate() + amount;
            this.selectedDate = new Date(this.selectedDate.setDate(date));
        },
        async addJournal() {
            const currentTime = Date.now();
            const eventInterval = currentTime - this.lastEventTime;
            this.lastEventTime = currentTime;

            if (eventInterval < 500) {
                return;
            }

            const $input = document.querySelector("#pending-journal");
            if (!$input?.value) return;

            try {
                const param = {
                    content: $input.value,
                    date: this.getSelectedDate,
                };
                await this.ADD_JOURNAL(param);
                $input.value = "";
            } catch (error) {
                console.log(error);
            }
        },
        async editJournal(journal) {
            const currentTime = Date.now();
            const eventInterval = currentTime - this.lastEventTime;
            this.lastEventTime = currentTime;

            if (eventInterval < 500) {
                return;
            }

            const { _id, content, checked } = journal || this.selectedJournal;
            this.deselectJournal();

            try {
                await this.EDIT_JOURNAL({ _id, content, checked });
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

            if ($input) $input.blur();
            this.selectedJournal = {};
        },
        updateJournalIndex({ oldIndex, newIndex }) {
            const findJournalIndex = (index) =>
                this.getJournals.findIndex(
                    (i) => i._id === this.dailyJournals[index]._id
                );
            const fromIndex = findJournalIndex(oldIndex);
            const toIndex = findJournalIndex(newIndex);
            this.UPDATE_JOURNAL_INDEX({ fromIndex, toIndex });
        },
        startEditing({ target }) {
            target.readOnly = false;
        },
        finishEditing({ target }) {
            const { content = "" } = this.getJournalById(target.dataset.id);
            target.readOnly = true;
            target.value = content;
        },
        updateInputValue({ target: { dataset, value } }) {
            const journal = this.getJournalById(dataset.id);
            journal.content = value;
            this.editJournal();
        },
        getJournalById(id) {
            const journal = this.dailyJournals.find((i) => i._id == id);
            return journal ?? {};
        },
        toggleOptions() {
            this.isShowOptions = !this.isShowOptions;
        },
    },
};
</script>

<style scoped>
.main-list {
    position: absolute;
    width: 40%;
    right: 0;
    height: 100%;
    z-index: 2 !important;
    overflow: visible !important;
}
.journal-list {
    position: relative;
    top: 0px;
    width: 100%;
    max-height: 70%;
    overflow-y: scroll;
    overflow-x: visible !important;
}
.journal-list::-webkit-scrollbar {
    cursor: pointer;
    width: 8px;
}
.journal-list::-webkit-scrollbar-thumb {
    background: rgba(73, 120, 250, 0.303) !important;
    border-radius: 5px;
}
.journal-list .journal:first-child {
    margin-top: 70px;
}
.journal-list .journal {
    position: relative;
    background: rgba(73, 120, 250, 0.097);
    z-index: 1;
    height: 35px;
    margin: 10px 40px;
    border-radius: 10px;
    padding: 2px;
    cursor: pointer;
}
.journal input[type="checkbox"] {
    transform: translate(-3px, 2px);
    z-index: 1;
    accent-color: rgb(73, 120, 250);
    cursor: pointer;
}
.journal input[type="text"] {
    position: relative;
    top: 7px;
    left: 5px;
    border: none;
    outline: none;
    width: 90%;
    font-size: 15px;
    background: transparent;
    border-bottom: 1px solid black;
    cursor: auto;
}
.journal input[type="text"]:read-only {
    border-bottom: none;
    cursor: pointer;
}
.journal.pending {
    position: relative;
    margin-top: 20px;
    left: -7px;
}
.journal.pending input {
    width: 400px;
}
.button-add {
    position: relative;
    width: 20px;
}
.button-option {
    position: absolute;
    transform: translateX(-25px);
    z-index: 10;
}
</style>
