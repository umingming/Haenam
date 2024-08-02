"use client";

import PropTypes from "prop-types";
import { BUTTON_KEY as KEY } from "@/constants/keyConstants";
import { BUTTON_CONFIGS } from "@/constants/uiConstants";

export default function ButtonBase({ action }) {
    const config = BUTTON_CONFIGS.find(config => config[KEY.ACTION] === action);

    if (!config) {
        console.error("Button is not defined")
        return null;
    }

    const buttonClass = `button-${action}`;
    const iconClass = config[KEY.ICON_CLASS];
    const text = config[KEY.TEXT];

    return (
        <button className={buttonClass}>
            {iconClass && <i className={iconClass}></i>}
            {text}
        </button>
    );
}

ButtonBase.propTypes = {
    action: PropTypes.string.isRequired,
};