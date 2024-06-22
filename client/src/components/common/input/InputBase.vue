<template>
    <div class="base-input">
        <label :for="name">{{ label }}</label>
        <input
            :id="name"
            :type="type"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>

<script>
import { LABELS } from "@/constants/common";
import { computed } from "vue";
export default {
    props: {
        modelValue: { type: String, required: true },
        name: { type: String },
        type: { type: String, default: "text" },
    },
    setup(props) {
        const label = computed(() => {
            const { text } = LABELS.find(({ name }) => name === props.name);
            return text;
        });

        return { label };
    },
};
</script>

<style></style>
