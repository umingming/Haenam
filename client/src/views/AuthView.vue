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
                    @click="selectForm(name)"
                >
                </base-button>
            </div>
            <sign-in-form v-if="isFormSelected('signIn')"></sign-in-form>
            <sign-up-form v-if="isFormSelected('signUp')"></sign-up-form>
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
    created() {
        const userId =
            localStorage.getItem("user_id") ||
            sessionStorage.getItem("user_id");
        if (userId) this.$router.push("/main");
    },
    methods: {
        selectForm(name) {
            this.selectedForm = name;
        },
    },
};
</script>

<style scoped></style>
