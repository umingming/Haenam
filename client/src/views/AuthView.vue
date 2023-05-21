<template>
    <div id="login" class="box">
        <div id="login-left">
            <h1>오늘도 <span>해냄!</span></h1>
            <div id="login-select">
                <button
                    v-for="name in formNames"
                    :key="name"
                    :class="{ on: isFormSelected(name) }"
                    @click="showForm(name)"
                >
                    {{ formatFormName(name) }}
                </button>
            </div>
            <sign-in-form v-if="isFormSelected('SignIn')"></sign-in-form>
            <sign-up-form v-if="isFormSelected('SignUp')"></sign-up-form>
        </div>
        <div id="login-right"></div>
    </div>
</template>

<script>
import SignInForm from "@/components/auth/SignInForm.vue";
import SignUpForm from "@/components/auth/SignUpForm.vue";
export default {
    name: "AuthView",
    components: {
        SignInForm,
        SignUpForm,
    },
    data() {
        return {
            formNames: ["SignIn", "SignUp"],
            selectedForm: "SignIn",
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
        formatFormName(name) {
            return name.replace(/([a-z])([A-Z])/g, "$1 $2");
        },
        showForm(name) {
            this.selectedForm = name;
        },
    },
};
</script>

<style scoped></style>
