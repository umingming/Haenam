<template>
    <div class="main-calendar">
        <v-calendar
            trim-weeks
            transparent
            borderless
            expanded
            :attributes="[attributeByDate]"
            @dayclick="selectDate"
            @click="selectDateByBox"
        ></v-calendar>
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
        ...mapGetters("journal", ["getSelectedDate"]),
        attributeByDate() {
            const dates = new Date(this.getSelectedDate);
            return {
                highlight: true,
                dates,
            };
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

<style scoped>
.main-calendar {
    position: absolute;
    z-index: 1 !important;
    left: 0;
    width: 60%;
    height: 100%;
    background: rgba(73, 120, 250, 0.097);
}
:deep .vc-pane-header-wrapper {
    width: 25% !important;
    left: 50%;
    transform: translateX(-50%);
}
:deep .vc-title {
    font-size: 18px;
}
:deep .vc-monthly .is-not-in-month * {
    opacity: 0.5;
}
:deep .vc-weekday {
    position: relative;
    transform: translate(29px, 3px);
    font-size: 15px;
    opacity: 0.5;
}
:deep .vc-day {
    background: white;
    margin: 5px;
    height: 80px;
    border-radius: 5px;
    cursor: pointer;
}
:deep .vc-day .vc-day-content {
    font-size: 15px;
    font-weight: 500 !important;
    transform: translate(29px, -25px);
    width: 25px;
    height: 25px;
}
:deep .vc-day:hover .vc-day-content {
    background: #2564eb17;
}
:deep .vc-highlight {
    transform: translate(29px, -24px);
    background: #2563eb;
    width: 25px;
    height: 25px;
}
:deep .day-content {
    font-size: 10px;
    transform: translate(3px, 2px);
}
</style>
