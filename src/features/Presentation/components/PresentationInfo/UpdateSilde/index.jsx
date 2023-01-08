/* eslint-disable no-plusplus */
/* eslint-disable object-shorthand */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import slideApi from '../../../../../api/slideApi';
import UpdateSlideForm from '../UpdateSlideForm';


function UpdateSlide(props) {
    const { enqueueSnackbar } = useSnackbar();
    const {slideId, idType, question, labels, datas, submitUpdate} = props;

    const handleSubmit = async (values) => {
        try {
            const labelsAdd = values.labels.map((item) => (item.labels));
            const numberItemAdded = labelsAdd.length - labels.length;
            for (let i = 0; i < numberItemAdded; i++) {
                datas.push(0);
            }

            const resp = await slideApi.updateSlide({
                id: slideId,
                question: values.question,
                labels: labelsAdd,
                datas: datas,
            });

            enqueueSnackbar("Create group successfully!!", {
                variant: "success",
                autoHideDuration: 1000
            });

            submitUpdate(slideId, idType)

        } catch (error) {
            enqueueSnackbar(error.message, {
                variant: "error",
                autoHideDuration: 1000
            });
        }
    }

    return (
        <UpdateSlideForm question={question} labels={labels} onSubmit={handleSubmit}/>
    );
}

UpdateSlide.propTypes = {
    slideId: PropTypes.string,
    idType: PropTypes.number,
    question: PropTypes.string, 
    labels: PropTypes.array,
    datas: PropTypes.array,
    submitUpdate: PropTypes.func,
};

UpdateSlide.defaultProps = {
    slideId: "",
    question: "",
    labels: [],
    datas: [],
    idType: 0,
    submitUpdate: () => {}
};

export default UpdateSlide;