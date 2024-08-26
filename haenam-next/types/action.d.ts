import { ACTION_KEY } from "@/constants/keyConstants";

export type Action = (typeof ACTION_KEY)[keyof typeof ACTION_KEY];
