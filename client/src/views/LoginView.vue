<template>
    <div id="login" class="box">
        <div id="login-left">
            <h1>오늘도 <span>해냄!</span></h1>
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
};
</script>

<style scoped></style>
