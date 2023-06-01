<template>
    <div class="base-input">
        <label :for="name">{{ label }}</label>
        <input
            :id="name"
            :type="type"
            :value="modelValue"
            @input="updateModelValue"
        />
    </div>
</template>

<script>
import { LABELS } from "@/constants/common";
export default {
    props: {
        modelValue: { type: String, required: true },
        name: { type: String },
        type: { type: String, default: "text" },
    },
    computed: {
        label() {
            return LABELS.find((i) => i.name === this.name)?.text;
        },
    },
    methods: {
        updateModelValue({ target: { value } }) {
            this.$emit("update:modelValue", value);
        },
    },
};
</script>

<style></style>
