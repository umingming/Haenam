"use client"

import PropTypes from "prop-types"
import { InputBase } from "@/components/common/input";;

export default function InputGroup({ name, type = "text", onChange = () => {} }) {
    const labelText = name.replace(/^[a-z]/, match => match.toUpperCase());

    return (
        <div className="mt-1 mb-4">
            <div className="flex items-center justify-between">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {labelText}
                </label>
            </div>
            <div className="mt-1">
                <InputBase name={name} type={type} onChange={onChange} />
            </div>
        </div>
    );
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func,
};
