<template>
    <div id="login" class="box">
        <div id="login-left">
            <h1>오늘도 <span>해냄!</span></h1>
            <div id="login-select">
                <base-button
                    v-for="name in formNames"
                    :key="name"
                    :class="{ on: isFormSelected(name) }"
                    :name="name"
                    @onClick="selectForm(name)"
                >
                </base-button>
            </div>
            <sign-in-form v-if="isFormSelected('signIn')"></sign-in-form>
            <sign-up-form
                v-if="isFormSelected('signUp')"
                @ok="selectForm('signIn')"
            ></sign-up-form>
        </div>
        <div id="login-right"></div>
    </div>
</template>

<script>
import SignInForm from "@/components/auth/SignInForm.vue";
import SignUpForm from "@/components/auth/SignUpForm.vue";
import BaseButton from "@/components/base/BaseButton.vue";
export default {
    name: "AuthView",
    components: {
        SignInForm,
        SignUpForm,
        BaseButton,
    },
    data() {
        return {
            formNames: ["signIn", "signUp"],
            selectedForm: "signIn",
        };
    },
    computed: {
        isFormSelected() {
            return (name) => name === this.selectedForm;
        },
    },
    methods: {
        selectForm(name) {
            this.selectedForm = name;
        },
    },
};
</script>

<style scoped></style>
