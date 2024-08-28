"use client";

import { InputBase } from "@/components/common/input";
import { InputProps } from "@/types/input";

export default function InputGroup({
    name,
    type = "text",
    value,
    onChange = () => {},
}: InputProps) {
    const labelText = name.replace(/^[a-z]/, (match) => match.toUpperCase());

    return (
        <div className="mt-1 mb-4">
            <div className="flex items-center justify-between">
                <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                    htmlFor={name}
                >
                    {labelText}
                </label>
            </div>
            <div className="mt-1">
                <InputBase
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}
