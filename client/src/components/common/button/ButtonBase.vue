<template>
    <button :class="buttonClass" @click="$emit('onClick')">
        <i :class="buttonConfig.iconClass"></i>
        {{ buttonConfig.text }}
    </button>
</template>

<script>
import { computed } from "vue";
import { BUTTON_KEY } from "@/constants/keyConstants";
import { BUTTON_CONFIGS } from "@/constants/uiConstants";

export default {
    name: "ButtonBase",
    props: {
        name: { type: String },
    },
    setup(props) {
        const buttonConfig = computed(() =>
            BUTTON_CONFIGS.find(
                (config) => config[BUTTON_KEY.ACTION] === props.name
            )
        );
        const buttonClass = computed(() => `button-${props.name}`);

        return { buttonConfig, buttonClass };
    },
};
</script>

<style></style>
