import { BUTTON_KEY } from "@/constants/keyConstants";
import { Action } from "./action";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    [BUTTON_KEY.ACTION]: Action;
}

export interface ButtonConfig {
    [BUTTON_KEY.ACTION]: Action;
    [BUTTON_KEY.ICON_CLASS]?: string;
    [BUTTON_KEY.TEXT]?: string;
}
