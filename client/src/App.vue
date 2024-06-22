<template>
    <div id="wrapper" :class="wrapperStyle">
        <router-view></router-view>
    </div>
</template>

<script>
import { computed } from "vue";
import { useRoutePath } from "@/composables/routeHandler";

export default {
    name: "App",
    setup() {
        const { PATH, pathValidator } = useRoutePath();
        // Main 화면에서만 Wrapper를 진하게 한다.
        const wrapperStyle = computed(() =>
            pathValidator.value(PATH.MAIN) ? "on" : "off"
        );

        return { wrapperStyle };
    },
};
</script>

<style></style>
