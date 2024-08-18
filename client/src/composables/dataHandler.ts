import { ref } from "vue";

type ValueType = string | boolean;

export function useLocalStorage(key: string, defaultValue: ValueType = "") {
    const item = ref<ValueType>(localStorage.getItem(key) ?? defaultValue);

    function setItem(value: ValueType = item.value) {
        if (value) {
            localStorage.setItem(key, String(value));
        }
    }

    function updateItem(shouldSave: boolean = true, value?: ValueType) {
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
