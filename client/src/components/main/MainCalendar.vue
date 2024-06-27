<template>
    <div class="main-calendar">
        <VCalendar
            :attributes="[attribute]"
            borderless
            expanded
            transparent
            trim-weeks
            @click="selectDateByBox"
            @dayclick="$emit('update:modelValue', $event.id)"
        />
    </div>
</template>

<script>
import { computed } from "vue";

export default {
    props: {
        modelValue: { type: String },
    },
    setup(props, { emit }) {
        const attribute = computed(() => ({
            dates: new Date(props.modelValue),
            highlight: true,
        }));

        /**
         * @param {MouseEvent} event
         * @param {Object} event.target
         */
        function selectDateByBox({ target: { classList } }) {
            // click한 target이 day box인지 검증
            if (classList.contains("vc-day")) {
                const pattern = /id-([\w-]+)/;
                // 날짜 추출해 이벤트 올림.
                const id = classList.value.match(pattern)[1];
                emit("update:modelValue", id);
            }
        }

        return { attribute, selectDateByBox };
    },
};
</script>

<style scoped></style>
