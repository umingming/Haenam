<template>
    <div class="main-list">
        <div class="title">
            <h2>{{ date }}</h2>
        </div>
        <div class="journal-list">
            <draggable
                v-bind="{ animation: 150 }"
                :list="dailyJournals"
                @end="updateJournalIndex"
            >
                <template v-slot:item="{ element, index }">
                    <div
                        class="journal"
                        :class="{ on: isSelected(index) }"
                        :data-id="element._id"
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
                            @keyup.backspace="removeJournalBy"
                            @keyup.enter="updateInputValue"
                        />
                    </div>
                </template>
            </draggable>
        </div>
        <div class="option">
            <div class="pending">
                <ButtonBase name="add" @onClick="addJournal" />
                <input
                    ref="newJournalRef"
                    placeholder="추가하기"
                    type="text"
                    @keyup.enter="addNewJournal"
                />
            </div>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import ButtonBase from "@/components/common/button/ButtonBase";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { useUserJournal } from "@/composables/userHandler";
import { computed, onBeforeMount, ref } from "vue";
export default {
    components: {
        draggable,
        ButtonBase,
    },
    props: {
        date: { type: String },
    },
    setup(props) {
        //============================ Journal
        const { journals, fetchJournals, addJournal, removeJournal } =
            useUserJournal();

        const dailyJournals = computed(() =>
            journals.value.filter(({ date }) => date.startsWith(props.date))
        );

        //Selection
        const selectedIndex = ref(-1);
        const isSelected = computed(() => index => index === selectedIndex);


        //Add
        const newJournalRef = ref(null);

        /**
         * 새로운 일정 추가
         */
        async function addNewJournal() {
            const content = newJournalRef.value.value;
            const { date } = props;

            if (validateEvent() && content) {
                await addJournal({ date, content });
                //Input초기화
                newJournalRef.value.value = "";
            }
        }

        // Remove
        /**
         * @param {KeyboardEvent} event
         *
         */
        async function removeJournalBy({ target: { dataset, value }, repeat }) {
            if (!repeat && !value) {
                console.log(dataset.id);
                await removeJournal(dataset.id);
            }
        }

        //============================ Event
        const lastEventTime = ref(0);

        function validateEvent() {
            const currentTime = Date.now();
            const eventInterval = currentTime - lastEventTime.value;
            lastEventTime.value = currentTime;

            return eventInterval > 500;
        }

        // 일정 가져오기
        onBeforeMount(fetchJournals);

        return {
            // Jounal
            dailyJournals,
            newJournalRef,
            addNewJournal,
            removeJournalBy,

            //Selection
            isSelected,
        };
    },
    data() {
        return {
            selectedJournal: {},
            lastEventTime: 0,
            journals: [],
        };
    },
    computed: {
        ...mapState(["userId"]),
        ...mapGetters("journal", ["getJournals", "getSelectedDate"]),
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
    },
};
</script>

<style scoped>
input[type="checkbox"] {
    transform: translate(-3px, 8px);
}
</style>
