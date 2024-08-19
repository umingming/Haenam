import { apiInstance } from "./index";
import { UserConfig } from "@/types/userTypes";
import { JournalConfig } from "@/types/journalTypes";

const PATH = "/journal";

function get(params: UserConfig) {
    return apiInstance.get(PATH, { params });
}
function add(config: JournalConfig) {
    return apiInstance.post(PATH, config);
}
function edit(config: JournalConfig) {
    return apiInstance.put(PATH, config);
}
function remove(id: number) {
    return apiInstance.delete(`${PATH}/${id}`);
}

export default { get, add, edit, remove };
