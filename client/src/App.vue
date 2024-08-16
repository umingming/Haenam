<template>
    <div id="wrapper" :class="wrapperStyle">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoutePath } from "@/composables/routeHandler";

export default defineComponent({
    name: "App",
    setup() {
        const { PATH, pathValidator } = useRoutePath();
        // Main 화면에서만 Wrapper를 진하게 한다.
        const wrapperStyle = computed(() =>
            pathValidator.value(PATH.MAIN) ? "on" : "off"
        );

        return { wrapperStyle };
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
