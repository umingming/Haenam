"use client";

import { InputProps } from "@/types/input";

export default function InputBase({
    name,
    type = "text",
    onChange = () => {},
}: InputProps) {
    return (
        <input
            name={name}
            type={type}
            className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            onChange={onChange}
        />
    );
}
