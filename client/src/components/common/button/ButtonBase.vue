<template>
    <button :class="buttonClass" @blur="handleEvent" @click="handleEvent">
        <i :class="buttonInfo('iconClass')"></i>
        {{ buttonInfo("text") }}
    </button>
</template>

<script>
import { BUTTONS } from "@/constants/common";
export default {
    name: "ButtonBase",
    props: {
        name: { type: String },
    },
    data() {
        return {
            lastEventTime: 0,
            lastEvent: "",
        };
    },
    computed: {
        button() {
            return BUTTONS.find((i) => i.name === this.name);
        },
        buttonInfo() {
            return (type) => this.button[type];
        },
        buttonClass() {
            return `button-${this.name}`;
        },
    },
    methods: {
        handleEvent({ type }) {
            const event = `on${type[0].toUpperCase()}${type.slice(1)}`;
            const eventTime = Date.now();
            const eventInterval = eventTime - this.lastEventTime;

            if (event !== this.lastEvent || eventInterval > 500) {
                this.$emit(event, this.name);
            }

            this.lastEvent = event;
            this.lastEventTime = eventTime;
        },
    },
};
</script>

<style></style>
