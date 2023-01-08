import axiosClient from "./axiosClient";

const slideHeadingApi = {
    async createSlideHeading(data) {
        const url = "/slide_heading/create";
        return axiosClient.post(url, {
            presentation_id: data.presentationId
        });
    },

    async updateSlideHeading(data) {
        const url = "/slide_heading/update";
        return axiosClient.post(url, {
            id: data.id,
            heading: data.heading,
        });
    },

    async getAllSlideHeadings(data) {
        const url = "/slide_heading";
        return axiosClient.get(url, {
            params: {
                presentation_id: data.presentationId
            }
        });
    },

    async getSlideHeadingByCode(data) {
        const url = "/slide_heading/get_slide_by_code";
        return axiosClient.get(url, {
            params: {
                code: data.code
            }
        });
    },

    async getSlideHeadingDetail(id) {
        const url = "/slide_heading/getone";
        return axiosClient.get(url, {
            params: {
                _id: id
            }
        });
    },

    async delete(data) {
        const url = "/slide_heading/delete";
        return axiosClient.post(url, {
            _id: data.id,
        });
    },

};


export default slideHeadingApi;