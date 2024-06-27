import { ref } from "vue";

export function useLocalStorage(key, defaultValue = "") {
    const item = ref(localStorage.getItem(key) ?? defaultValue);

    /**
     * @param {String|Boolean|null} value
     */
    function setItem(value = item.value) {
        if (value) {
            localStorage.setItem(key, value);
        }
    }

    /**
     * @param {Boolean|null} shouldSave
     * @param {String|Boolean|null} value
     */
    function updateItem(shouldSave = true, value = item.value) {
        if (shouldSave) {
            setItem(value);
        } else {
            localStorage.removeItem(key);
        }
    }

    return {
        item,
        setItem,
        updateItem,
    };
}
