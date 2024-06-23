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

    const userIdConfig = computed(() => ({ [KEY.ID]: userId.value }));

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

    return {
        KEY,
        userId,
        userIdConfig,
        afterLogin,
        beforeLogout,
    };
}

//============================ useUserJournal
import JOURNAL from "@/api/journal.js";

const journals = ref([]);

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

    /**
     * @param {Object} journal
     */
    async function addJournal(journal) {
        try {
            const { data } = await JOURNAL.add(
                Object.assign(journal, userIdConfig.value)
            );
            journals.value.push(data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @param {Object} journal
     */
    async function editJournal(journal) {
        try {
            const { data } = await JOURNAL.edit(journal);
            const index = findJournalIndexBy(data._id);
            journals.value[index] = journal;
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @param {Number} id
     */
    async function removeJournal(id) {
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

    /**
     * @param {String} id
     * @returns {Number}
     */
    function findJournalIndexBy(id) {
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
