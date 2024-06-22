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
                        :data-id="element._id"
                        @click="showOption"
                    >
                        <input
                            v-model="element.checked"
                            type="checkbox"
                            @change="editJournal(element)"
                        />
                        <input
                            :data-id="element._id"
                            :readonly="true"
                            type="text"
                            :value="element.content"
                            @blur="finishEditing"
                            @dblclick="startEditing"
                            @focus="selectJournal(element)"
                            @keyup.backspace="handleBackspaceInput"
                            @keyup.enter="updateInputValue"
                        />
                    </div>
                </template>
            </draggable>
        </div>
        <div class="option">
            <div class="pending">
                <base-button name="add" @onClick="addJournal"></base-button>
                <input
                    id="pending-journal"
                    placeholder="추가하기"
                    type="text"
                    @keyup.enter="addJournal"
                />
            </div>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import BaseButton from "@/components/common/base/BaseButton.vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
    components: {
        draggable,
        BaseButton,
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
        editInput(id) {
            const $input = document.querySelector(`[data-id="${id}"]`);
            this.startEditing({ target: $input });
        },
        startEditing({ target }) {
            target.readOnly = false;
            target.focus();
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
        showOption({ target }) {
            console.dir(target);
        },
    },
};
</script>

<style scoped>
input[type="checkbox"] {
    transform: translate(-3px, 8px);
}
</style>
