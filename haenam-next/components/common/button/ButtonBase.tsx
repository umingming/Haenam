"use client";

import { ButtonProps } from "@/types/button";
import { BUTTON_KEY as KEY } from "@/constants/keyConstants";
import { BUTTON_CONFIGS } from "@/constants/uiConstants";

export default function ButtonBase({
    action,
    className,
    onClick = () => {},
}: ButtonProps) {
    const config = BUTTON_CONFIGS.find(
        (config) => config[KEY.ACTION] === action,
    );

    if (!config) {
        console.error("Button is not defined");
        return null;
    }

    const buttonClass = `button-${action} ${className}`;
    const iconClass = config[KEY.ICON_CLASS];
    const text = config[KEY.TEXT];

    return (
        <button className={buttonClass} onClick={onClick}>
            {iconClass && <i className={iconClass}></i>}
            {text}
        </button>
    );
}
