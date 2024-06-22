import { computed, readonly } from "vue";
import { useRoute } from "vue-router";

export function useRoutePath() {
    const PATH = readonly({
        AUTH: "/auth",
        MAIN: "/main",
    });

    const route = useRoute();
    // path를 인자로 현재 route path와 비교
    const pathValidator = computed(() => (path) => route.path === path);

    return {
        PATH,
        pathValidator,
    };
}
