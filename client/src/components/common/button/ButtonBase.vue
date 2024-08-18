<template>
    <button :class="buttonClass" @click="$emit('onClick')">
        <i v-if="iconClass" :class="iconClass"></i>
        {{ text }}
    </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { BUTTON_KEY as KEY } from "@/constants/keyConstants";
import { BUTTON_CONFIGS } from "@/constants/uiConstants";
import { ButtonConfig } from "@/types/buttonTypes";

export default defineComponent({
    name: "ButtonBase",
    props: {
        action: { type: String, required: true },
    },
    setup(props) {
        const buttonConfig = computed<ButtonConfig | undefined>(() =>
            BUTTON_CONFIGS.find((config) => config[KEY.ACTION] === props.action)
        );

        const buttonClass = computed(() => `button-${props.action}`);
        const iconClass = computed(() => buttonConfig.value?.[KEY.ICON_CLASS]);
        const text = computed(() => buttonConfig.value?.[KEY.TEXT]);

        return { buttonClass, iconClass, text };
    },
});
</script>

<style></style>
