import { apiInstance } from "./index.js";
const path = "/api/journal";

function get(data) {
    return apiInstance.get(path, data);
}
function add(data) {
    return apiInstance.post(path, data);
}
function edit(data) {
    return apiInstance.put(path, data);
}
function remove(id) {
    return apiInstance.delete(`${path}/${id}`);
}

export default { get, add, edit, remove };
