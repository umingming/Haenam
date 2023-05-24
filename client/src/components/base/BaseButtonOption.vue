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

<style scoped>
.button-option {
    position: absolute;
}
.main-button {
    position: absolute;
    top: 6px;
    z-index: 1;
    width: 20px;
    height: 20px;
    color: #c2c2c2;
    line-height: 20px;
    border-radius: 10px;
}
.main-button:hover,
.button-close {
    background: rgb(73, 120, 250);
    color: white;
}
.option-box {
    position: absolute;
    top: -72px;
    left: 8px;
    background: white;
    padding: 6px auto;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.046);
    box-shadow: 1px 1px rgba(0, 0, 0, 0.116);
    transform-origin: left bottom;
    transform: scale(0);
    transition: transform 0.4s ease-in;
    overflow: hidden;
}
.option-box.on {
    transform: scale(1);
    transition: transform 0.4s linear;
}
@keyframes scaleUp {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
.option-box button {
    display: block;
    height: 25px;
    width: 56px;
    margin: 3px;
    border-radius: 2px;
    color: #8b8b8b;
}
.option-box button:hover {
    background: rgba(73, 120, 250, 0.034);
    color: #616161;
    font-weight: 600;
    transform: scale(1.02);
}
.option-box :deep button:hover i {
    transform: scale(1.2);
}
.option-box button::after {
    content: "";
    position: absolute;
    left: 4px;
    width: 52px;
    border-bottom: 1px solid #c2c2c256;
    transform: translateY(23px);
}
.option-box button:last-child {
    padding-bottom: 1px;
}
.option-box button:last-child::after {
    border-bottom: none;
}
.option-box :deep button i {
    width: 14px;
}
</style>
