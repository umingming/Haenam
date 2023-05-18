import { apiInstance } from "./index.js";
const path = "/journal";

function get(params) {
    return apiInstance.get(path, { params });
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
