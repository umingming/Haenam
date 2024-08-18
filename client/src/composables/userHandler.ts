import { ref, computed } from "vue";
import { AUTH_KEY, USER_KEY } from "@/constants/keyConstants";
import { AuthConfig, UserConfig } from "@/types/userTypes";
import { JournalConfig } from "@/types/journalTypes";

//============================ useAuthorityConfig
export function useAuthorityConfig() {
    // Key를 개별 필드로 관리
    const idRef = ref<string>("");
    const pwRef = ref<string>("");

    // config 반응형 객체 정의
    const authConfig = computed<AuthConfig>(() => ({
        [AUTH_KEY.ID]: idRef.value,
        [AUTH_KEY.PW]: pwRef.value,
    }));

    return { idRef, pwRef, authConfig };
}

//============================ useUserId
import { useLocalStorage } from "@/composables/dataHandler";

export function useUserInfo() {
    // userId 정보를 localStorage에서 가져온다.
    const { item: userId, updateItem: updateUserId } = useLocalStorage(
        USER_KEY.ID
    );
    const { setItem: setLoggedIn } = useLocalStorage(USER_KEY.LOGGED_IN);

    const userIdConfig = computed<UserConfig>(() => ({
        [USER_KEY.ID]: String(userId.value),
    }));

    function afterLogin(config: UserConfig) {
        updateUserId(true, config[USER_KEY.ID]);
        setLoggedIn(true);
    }

    function beforeLogout() {
        updateUserId(false);
        setLoggedIn(false);
    }

    return {
        userId,
        userIdConfig,
        afterLogin,
        beforeLogout,
    };
}

//============================ useUserJournal
import JOURNAL from "@/api/journal.js";

const journals = ref<JournalConfig[]>([]);

export function useUserJournal() {
    const { userIdConfig } = useUserInfo();

    /**
     * 사용자 정보를 토대로 일정 가져옴.
     */
    async function fetchJournals() {
        try {
            const { data } = await JOURNAL.get(userIdConfig.value);
            journals.value = data;
        } catch (error) {
            console.log(error);
        }
    }

    async function addJournal(journal: JournalConfig) {
        try {
            const { data } = await JOURNAL.add(
                Object.assign(journal, userIdConfig.value)
            );
            journals.value.push(data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    async function editJournal(journal: JournalConfig) {
        try {
            const { data } = await JOURNAL.edit(journal);
            const index = findJournalIndexBy(data._id);
            journals.value[index] = journal;
        } catch (error) {
            console.log(error);
        }
    }

    async function removeJournal(id: number) {
        try {
            await JOURNAL.remove(id);
            const index = findJournalIndexBy(id);
            // 존재하는 경우만
            if (index > -1) {
                journals.value.splice(index, 1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function findJournalIndexBy(id: string | number) {
        return journals.value.findIndex(({ _id }) => _id == id);
    }

    return {
        journals,
        fetchJournals,
        addJournal,
        editJournal,
        removeJournal,
    };
}
