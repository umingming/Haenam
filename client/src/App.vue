<template>
    <div id="wrapper" :class="{ on: isAuthView }">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    computed: {
        isAuthView() {
            return this.$route.name === "AuthView";
        },
    },
    created() {
        const userId =
            localStorage.getItem("user_id") ||
            sessionStorage.getItem("user_id");

        const path = userId ? "main" : "auth";
        this.$router.push(`/${path}`);
    },
};
</script>

<style></style>
