import { computed, readonly } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useRoutePath() {
    const PATH = readonly({
        AUTH: "/auth",
        LOGIN: "/login",
        MAIN: "/main",
    });

    const route = useRoute();
    const router = useRouter();
    // path를 인자로 현재 route path와 비교
    const pathValidator = computed(() => {
        return (path: string): boolean => route.path === path;
    });

    function goPath(path: string) {
        router.push(path);
    }

    return {
        PATH,
        pathValidator,
        goPath,
    };
}
