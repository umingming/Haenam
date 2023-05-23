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
    position: relative;
    width: 60%;
    height: 100%;
    float: left;
    background: rgba(73, 120, 250, 0.097);
}
::v-deep .vc-monthly .is-not-in-month * {
    opacity: 0.5;
}
::v-deep .vc-weekday {
    position: relative;
    transform: translate(-25px, 3px);
    font-size: 15px;
    opacity: 0.5;
}
::v-deep .vc-day {
    background: white;
    margin: 5px;
    height: 60px;
    border-radius: 5px;
    cursor: pointer;
}
::v-deep .vc-day .vc-day-content {
    font-size: 15px;
    font-weight: 500 !important;
    transform: translate(-23px, -15px);
    width: 25px;
    height: 25px;
}
::v-deep .vc-day:hover .vc-day-content {
    background: rgba(255, 192, 203, 0.516);
}
::v-deep .vc-highlight {
    transform: translate(-23px, -15px);
    background: pink;
    width: 25px;
    height: 25px;
}
::v-deep .day-content {
    font-size: 10px;
    transform: translate(3px, 2px);
}
</style>
