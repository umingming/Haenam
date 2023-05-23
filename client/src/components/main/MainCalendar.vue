<template>
    <div class="main-calendar">
        <v-calendar
            trim-weeks
            transparent
            borderless
            expanded
            @dayclick="selectDate"
            @click="selectDateByBox"
        ></v-calendar>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    components: {},
    data() {
        return {};
    },
    computed: {},
    created() {},
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
::v-deep .vc-day-content {
    font-size: 15px;
    transform: translate(-25px, -15px);
    width: 25px;
    height: 25px;
}
::v-deep .vc-day:hover .vc-day-content {
    background: pink;
}
::v-deep .day-content {
    font-size: 10px;
    transform: translate(3px, 2px);
}
</style>
