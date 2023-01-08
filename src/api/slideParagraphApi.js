import axiosClient from "./axiosClient";

const slideParagraphApi = {
    async createSlideParagraph(data) {
        const url = "/slide_paragraph/create";
        return axiosClient.post(url, {
            presentation_id: data.presentationId
        });
    },

    async updateSlideParagraph(data) {
        const url = "/slide_paragraph/update";
        return axiosClient.post(url, {
            id: data.id,
            heading: data.heading,
            paragraph: data.paragraph,
        });
    },

    async getAllSlideParagraphs(data) {
        const url = "/slide_paragraph";
        return axiosClient.get(url, {
            params: {
                presentation_id: data.presentationId
            }
        });
    },

    async getSlideParagraphsByCode(data) {
        const url = "/slide_paragraph/get_slide_by_code";
        return axiosClient.get(url, {
            params: {
                code: data.code
            }
        });
    },

    async getSlideParagraphDetail(id) {
        const url = "/slide_paragraph/getone";
        return axiosClient.get(url, {
            params: {
                _id: id
            }
        });
    },

    async delete(data) {
        const url = "/slide_paragraph/delete";
        return axiosClient.post(url, {
            _id: data.id,
        });
    },

};


export default slideParagraphApi;