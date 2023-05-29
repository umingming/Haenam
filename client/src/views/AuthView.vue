<template>
    <div id="login" class="box">
        <div id="login-left">
            <h1>오늘도 <span>해냄!</span></h1>
            <div id="login-select">
                <base-button
                    v-for="(name, index) in formNames"
                    :key="index"
                    :class="{ on: isFormSelected(index) }"
                    :name="name"
                    @onClick="selectForm(index)"
                >
                </base-button>
            </div>
            <login-form v-if="isFormSelected(0)"></login-form>
            <register-form v-else @ok="selectForm(0)"></register-form>
        </div>
        <div id="login-right"></div>
    </div>
</template>

<script>
import LoginForm from "@/components/auth/LoginForm.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";
import BaseButton from "@/components/base/BaseButton.vue";
export default {
    name: "AuthView",
    components: {
        LoginForm,
        RegisterForm,
        BaseButton,
    },
    data() {
        return {
            formNames: ["login", "register"],
            selectedIndex: 0,
        };
    },
    computed: {
        isFormSelected() {
            return (index) => index === this.selectedIndex;
        },
    },
    methods: {
        selectForm(index) {
            this.selectedIndex = index;
        },
    },
};
</script>

<style scoped></style>
