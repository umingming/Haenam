<template>
    <div class="button-option">
        <base-button
            class="main-button"
            :name="buttonName"
            @onClick="toggleOption"
            @onBlur="hideOption"
        ></base-button>
        <div class="option-box" :class="{ on: isShowOption }">
            <base-button
                v-for="option of options"
                :key="option"
                :name="option"
                @onClick="selectOption"
            ></base-button>
        </div>
    </div>
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
export default {
    components: {
        BaseButton,
    },
    data() {
        return {
            isShowOption: false,
            options: ["copy", "edit", "remove"],
            selectedOption: "",
        };
    },
    computed: {
        buttonName() {
            return !this.isShowOption ? "ellipsis" : "close";
        },
    },
    methods: {
        toggleOption() {
            this.isShowOption = !this.isShowOption;
        },
        showOption() {
            this.isShowOption = true;
        },
        hideOption() {
            this.isShowOption = false;
        },
        selectOption(name) {
            this.$emit(name);
        },
    },
};
</script>

<style scoped></style>
