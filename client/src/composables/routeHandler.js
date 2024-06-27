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
    const pathValidator = computed(() => (path) => route.path === path);

    /**
     * path로 이동한다
     * @param {String} path
     */
    function goPath(path) {
        router.push(path);
    }

    return {
        PATH,
        pathValidator,
        goPath,
    };
}
