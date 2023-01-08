import axiosClient from "./axiosClient";

const groupApi = {
    async createGroup(data) {
        const url = "/group/create";
        return axiosClient.post(url, {
            name: data.name,
            description: data.description
        });
    },

    async updateRole(data) {
        const url = "/group/update_role";
        return axiosClient.put(url, {
            group_id: data.groupId,
            user_id_update: data.userIdUpdate,
            role: data.role,
        });
    },

    async getAllGroups() {
        const url = "/group";
        return axiosClient.get(url);
    },

    async deleteMember(data) {
        const url = "/group/delete_member";
        return axiosClient.delete(url, {
            data: {
                group_id: data.groupId,
                user_id_delete: data.userIdDelete
            }
        });
    },

    async deleteGroup(data) {
        const url = "/group/delete_group";
        return axiosClient.delete(url, {
            data: {
                group_id: data.groupId,
            }
        });
    },

    async getGroupDetail(id) {
        const url = "/group/getone";
        return axiosClient.get(url, {
            params: {
                _id: id
            }
        });
    },

    async getAllGroupMembers(id) {
        const url = "/group/get_all_member";
        return axiosClient.get(url, {
            params: {
                group_id: id
            }
        });
    },

    async getInviteGroupLink(groupId) {
        const url = "/group/create_link";
        return axiosClient.get(url, {
            params: {
                group_id: groupId
            }
        });
    },

    async inviteGroupLink(groupId) {
        const url = "/group/invite";
        return axiosClient.get(url, {
            params: {
                group_id: groupId
            }
        });
    },

    async sendInviteGroupLink(data) {
        const url = "/group/send_link";
        return axiosClient.get(url, {
            params: {
                group_id: data.group_id,
                email: data.email
            }
        });
    },
};


export default groupApi;