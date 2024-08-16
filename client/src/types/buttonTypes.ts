import { BUTTON_KEY, ACTION_KEY } from "@/constants/keyConstants"

type Action = typeof ACTION_KEY[keyof typeof ACTION_KEY];

export interface ButtonConfig {
    [BUTTON_KEY.ACTION]: Action;
    [BUTTON_KEY.ICON_CLASS]?: string;
    [BUTTON_KEY.TEXT]?: string;
}