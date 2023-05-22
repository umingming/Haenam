<template>
    <div class="main-list">
        <div class="title">
            <base-button name="left" @onClick="updateDate(-1)"></base-button>
            <h2>{{ dailyFormat }}</h2>
            <base-button name="right" @onClick="updateDate(1)"></base-button>
        </div>
        <div class="journal-list">
            <draggable
                :disabled="false"
                :list="dailyJournals"
                item-key="_id"
                v-bind="{ animation: 150 }"
                @end="updateJournalIndex"
            >
                <template #item="{ element }">
                    <div
                        class="journal"
                        :class="{ on: isSelectedJournal(element) }"
                    >
                        <input
                            type="checkbox"
                            :value="element.checked"
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
                        <base-button
                            name="edit"
                            @onClick="editJournal()"
                        ></base-button>
                        <base-button
                            name="remove"
                            @onClick="removeJournal(element._id)"
                        ></base-button>
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
import BaseButton from "@/components/base/BaseButton.vue";
import draggable from "vuedraggable";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
    components: {
        BaseButton,
        draggable,
    },
    data() {
        return {
            selectedDate: new Date(),
            selectedJournal: {},
            lastEventTime: 0,
            drag: false,
            journals: [],
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
                    date: this.selectedDate,
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
            $input.blur();

            this.selectedJournal = {};
        },
        updateJournalIndex({ oldIndex: fromIndex, newIndex: toIndex }) {
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
    },
};
</script>

<style scoped>
.main-list {
    width: 40%;
    float: left;
}
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
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 450px;
    max-height: 72%;
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
    background: rgba(73, 120, 250, 0.097);
    height: 35px;
    margin: 10px;
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
    font-size: 20px;
    background: transparent;
    border-bottom: 1px solid black;
    cursor: auto;
}
.journal input[type="text"]:read-only {
    border-bottom: none;
    cursor: pointer;
}
.button-edit {
    position: absolute;
    transform: translate(-4px, 4px);
    font-size: 15px;
    z-index: -1;
    opacity: 0;
}
.journal.on .button-edit {
    z-index: 1;
    opacity: 1;
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
.flip-list-move {
    transition: transform 0.5s;
}
</style>
