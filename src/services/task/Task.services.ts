import { HTTP } from "../../config/HTTPConfig"; 
import { Api } from "../../config/Api";

const version = "/v1";

export const TaskServices = {
    getTasks: async () => {
        return await HTTP.get(`${Api.URL}${version}/tasks`);
    },
    createTask: async (data: any) => {
        return await HTTP.post(`${Api.URL}${version}/tasks`, data);
    },
    updateTask: async (id: string, data: any) => {
        return await HTTP.put(`${Api.URL}${version}/tasks/${id}`, data);
    },
    deleteTask: async (id: string) => {
        return await HTTP.delete(`${Api.URL}${version}/tasks/${id}`);
    },
};