<template>
    <div id="login" class="box">
        <div id="login-left">
            <h1>오늘도 <span>해냄!</span></h1>
            <div id="login-select">
                <button id="sign-in">Sign In</button>
                <button id="sign-up">Sign Up</button>
            </div>
            <login-form></login-form>
        </div>
        <div id="login-right"></div>
    </div>
</template>

<script>
import LoginForm from "@/components/login/LoginForm.vue";
export default {
    name: "LoginView",
    components: {
        LoginForm,
    },
    created() {
        const userId = localStorage.getItem("user_id");
        if (userId) this.$router.push("/main");
    },
};
</script>

<style scoped></style>
