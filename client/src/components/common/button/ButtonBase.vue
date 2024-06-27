<template>
    <button :class="buttonClass" @click="$emit('onClick')">
        <i :class="buttonConfig.iconClass"></i>
        {{ buttonConfig.text }}
    </button>
</template>

<script>
import { computed } from "vue";
import { BUTTONS } from "@/constants/common";
export default {
    name: "ButtonBase",
    props: {
        name: { type: String },
    },
    setup(props) {
        const buttonConfig = computed(() =>
            BUTTONS.find(({ name }) => name === props.name)
        );
        const buttonClass = computed(() => `button-${props.name}`);

        return { buttonConfig, buttonClass };
    },
};
</script>

<style></style>
