"use client"

import PropTypes from "prop-types"
import { InputBase } from "@/components/common/input";;

export default function InputGroup({ type = "text", onChange = () => {} }) {
    const labelText = type.replace(/^[a-z]/, match => match.toUpperCase());

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
                <InputBase type={type} onChange={onChange} />
            </div>
        </div>
    );
}

InputGroup.propTypes = {
    type: PropTypes.string,
    onChange: PropTypes.func,
};
