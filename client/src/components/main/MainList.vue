<template>
    <div class="main-list">
        <div class="title">
            <h2>{{ date }}</h2>
        </div>
        <div class="journal-list">
            <draggable v-bind="{ animation: 150 }" :list="dailyJournals">
                <template v-slot:item="{ element, index }">
                    <div
                        class="journal"
                        :class="{ on: isSelected(index) }"
                        :data-id="element._id"
                    >
                        <input
                            v-model="element.checked"
                            type="checkbox"
                            @change="checkJournal(index)"
                        />
                        <input
                            v-model="element.content"
                            :data-id="element._id"
                            :readonly="true"
                            type="text"
                            @blur="finishEditing"
                            @dblclick="startEditing"
                            @focus="selectJournal(index)"
                            @keydown.backspace="removeJournalBy"
                            @keyup.enter="editJournalBy(index)"
                        />
                    </div>
                </template>
            </draggable>
        </div>
        <div class="option">
            <div class="pending">
                <ButtonBase action="add" @onClick="addNewJournal" />
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
import { computed, onBeforeMount, ref } from "vue";
import { useUserJournal } from "@/composables/userHandler";

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
        const {
            journals,
            fetchJournals,
            addJournal,
            editJournal,
            removeJournal,
        } = useUserJournal();

        const dailyJournals = computed(() =>
            journals.value.filter(({ date }) => date.startsWith(props.date))
        );

        //Selection
        const selectedIndex = ref(-1);
        const selectedJournal = computed(
            () => dailyJournals.value[selectedIndex.value]
        );
        const isSelected = computed(
            () => (index) => index === selectedIndex.value
        );

        /**
         * @param {Number} index
         */
        function selectJournal(index) {
            selectedIndex.value = index;
        }

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

        // Editing
        const editingRef = ref(null);

        /**
         * @param {MouseEvent} event
         * @param {Object} target
         */
        function startEditing({ target }) {
            editingRef.value = target;
            target.readOnly = false;
            target.focus();
        }

        /**
         * @param {MouseEvent} event
         * @param {Object} target
         */
        function finishEditing({ target }) {
            const { content = "" } = selectedJournal.value ?? {};
            target.readOnly = true;
            target.value = content;

            // 편집 초기화
            selectedIndex.value = -1;
            editingRef.value = null;
        }

        /**
         * index를 기준으로 Journal checked 상태 토글
         * @param {Number} index
         */
        async function checkJournal(index) {
            editJournalBy(index);
        }

        /**
         * @param {Number} index
         */
        async function editJournalBy(index = selectedIndex.value) {
            if (validateEvent()) {
                const journal = dailyJournals.value[index];
                await editJournal(journal);

                // edit input blur 처리
                editingRef.value?.blur();
            }
        }

        // Remove
        /**
         * @param {KeyboardEvent} event
         */
        async function removeJournalBy({ target: { dataset, value }, repeat }) {
            // keydown에서 현재 값이 없을 경우 삭제 수행
            if (!repeat && !value) {
                await removeJournal(dataset.id);
            }
        }

        //============================ Event
        const lastEventTime = ref(0);

        /**
         * 이벤트 검증
         */
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
            selectJournal,

            //Edit
            startEditing,
            finishEditing,
            checkJournal,
            editJournalBy,
        };
    },
};
</script>

<style scoped>
input[type="checkbox"] {
    transform: translate(-3px, 8px);
}
</style>
