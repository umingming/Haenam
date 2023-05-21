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
};
</script>

<style></style>
