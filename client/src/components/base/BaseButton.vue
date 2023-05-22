<template>
    <button :class="buttonClass" @click="handleClick">
        <i :class="buttonInfo('iconClass')"></i>
        {{ buttonInfo("text") }}
    </button>
</template>

<script>
import { BUTTONS } from "@/constants/common";
export default {
    props: {
        name: { type: String },
    },
    data() {
        return {
            lastClickTime: 0,
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
        handleClick() {
            const currentTime = Date.now();
            const clickInterval = currentTime - this.lastClickTime;

            if (clickInterval > 500) {
                this.$emit("onClick");
            }

            this.lastClickTime = currentTime;
        },
    },
};
</script>

<style></style>
