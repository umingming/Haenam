import { ref } from "vue";

export function useLocalStorage(key, defaultValue = "") {
    const item = ref(localStorage.getItem(key) ?? defaultValue);

    /**
     * @param {Boolean|null} shouldSave
     * @param {String|Boolean|null} value
     */
    function updateItem(shouldSave = true, value = item.value) {
        if (shouldSave && value) {
            localStorage.setItem(key, value);
        } else {
            localStorage.removeItem(key);
        }
    }

    /**
     * 객체에서 key에 해당하는 정보를 찾아 저장한다.
     * @param {Object} config
     */
    function setItemBy(config) {
        localStorage.setItem(key, config[key]);
    }

    return {
        item,
        updateItem,
        setItemBy,
    };
}
