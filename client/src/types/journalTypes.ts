import { JOURNAL_KEY as KEY } from "@/constants/keyConstants";

export interface JournalConfig {
    [KEY.ID]?: string;
    [KEY.USER_ID]: string;
    [KEY.CONTENT]: string;
    [KEY.DATE]: string;
}
