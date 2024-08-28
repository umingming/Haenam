"use client";

import { useState } from "react";

export function useInputHandler(initValue: string = "") {
    const [value, setValue] = useState(initValue);

    function handleValue(event: React.ChangeEvent<HTMLInputElement>) {
        const { value: newValue } = event.target;
        setValue(newValue);
    }

    return { value, handleValue };
}
