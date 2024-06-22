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

export function useUserInfo() {
    const KEY = readonly({
        ID: "user_id",
        LOGGED_IN: "loggedIn",
    });

    // userId 정보를 localStorage에서 가져온다.
    const { item: userId, updateItem: updateUserId } = useLocalStorage(KEY.ID);
    const { setItem: setLoggedIn } = useLocalStorage(KEY.LOGGED_IN);

    /**
     * 로그인한 유저의 id를 저장한다.
     * @param {Object} config
     */
    function afterLogin(config) {
        updateUserId(true, config[KEY.ID]);
        setLoggedIn(true);
    }

    /**
     * Id 제거
     */
    function beforeLogout() {
        updateUserId(false);
        setLoggedIn(false);
    }

    return { KEY, userId, afterLogin, beforeLogout };
}
