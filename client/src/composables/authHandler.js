import { ref, readonly, computed } from "vue";

//============================ useAuthorityConfig
export function useAuthorityConfig() {
    const KEY = readonly({
        ID: "id",
        PW: "pw",
    });

    // Key를 개별 필드로 관리
    const idRef = ref("");
    const pwRef = ref("");

    // config 반응형 객체 정의
    const authConfig = computed(() => ({
        [KEY.ID]: idRef.value,
        [KEY.PW]: pwRef.value,
    }));

    return { KEY, idRef, pwRef, authConfig };
}

//============================ useUserId
import { useLocalStorage } from "@/composables/dataHandler";

export function useUserId() {
    const KEY = "user_id";

    // userId 정보를 localStorage에서 가져온다.
    const { item: userId, setItemBy: setUserIdBy } = useLocalStorage(KEY);

    return { KEY, userId, setUserIdBy };
}
