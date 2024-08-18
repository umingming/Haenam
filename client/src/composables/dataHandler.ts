import { ref } from "vue";

type Value = string | boolean;

export function useLocalStorage(key: string, defaultValue: Value = "") {
    const item = ref<Value>(localStorage.getItem(key) ?? defaultValue);

    function setItem(value: Value = item.value): void {
        if (value) {
            localStorage.setItem(key, String(value));
        }
    }

    function updateItem(shouldSave: boolean = true, value?: Value): void {
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
