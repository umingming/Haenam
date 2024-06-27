<template>
    <div id="auth" class="box">
        <div id="auth-left">
            <h1 data-test="title">오늘도 <span>해냄!</span></h1>
            <div id="auth-select">
                <ButtonRoute pathName="login" />
                <ButtonRoute pathName="register" />
            </div>
            <RouterView v-slot="{ Component }">
                <Component :is="Component" />
            </RouterView>
        </div>
        <div id="auth-right"></div>
    </div>
</template>

<script>
import ButtonRoute from "@/components/common/button/ButtonRoute";
export default {
    name: "AuthView",
    components: {
        ButtonRoute,
    },
};
</script>

<style scoped></style>
