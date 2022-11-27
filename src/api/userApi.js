import axiosClient from "./axiosClient";

const userApi = {
    async register(data) {
        const url = "/user/register";
        return axiosClient.post(url, {
            name: data.name,
            email: data.email,
            // status: data.status,
            password: data.password,
        });
    },

    async login(data) {
        const url = "/user/login";
        return axiosClient.post(url, {
            email: data.email,
            password: data.password,
        });
    },

    async update(data) {
        const url = "/user/local/update";
        return axiosClient.post(url, data);
    },

    async get(userId) {
        const url = `/user/local/get/${userId}`;
        return axiosClient.get(url);
    },
};


export default userApi;