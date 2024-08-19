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
import { computed } from "vue";

export default {
    props: {
        modelValue: { type: String, required: true },
        name: { type: String },
        type: { type: String, default: "text" },
        text: { type: String },
    },
    setup(props) {
        const label = computed(() => props.text || props.name);

        return { label };
    },
};
</script>

<style></style>
