import { BUTTON_KEY } from "@/constants/keyConstants";
import { Action } from "./action";

export interface ButtonProps {
    [BUTTON_KEY.ACTION]: Action;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ButtonConfig {
    [BUTTON_KEY.ACTION]: Action;
    [BUTTON_KEY.ICON_CLASS]?: string;
    [BUTTON_KEY.TEXT]?: string;
}
