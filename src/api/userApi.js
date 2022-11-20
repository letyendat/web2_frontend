import axiosClient from "./axiosClient";

const userApi = {
    async Register(data) {
        const url = "/api/users/register";
        return axiosClient.post(url, {
            name: data.name,
            email: data.email,
            password: data.password
        });
    },
};


export default userApi;