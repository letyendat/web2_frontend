/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import slideHeadingApi from '../../../../../api/slideHeadingApi';
import UpdateSlideHeadingForm from '../UpdateSlideHeadingForm';


function UpdateSlideHeading(props) {
    const { enqueueSnackbar } = useSnackbar();
    const {slideId, idType, heading, submitUpdate} = props;

    const handleSubmit = async (values) => {
        try {
            const resp = await slideHeadingApi.updateSlideHeading({
                id: slideId,
                heading: values.heading,
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
        <UpdateSlideHeadingForm heading={heading} onSubmit={handleSubmit}/>
    );
}

UpdateSlideHeading.propTypes = {
    slideId: PropTypes.string,
    idType: PropTypes.number,
    heading: PropTypes.string,
    submitUpdate: PropTypes.func,
};

UpdateSlideHeading.defaultProps = {
    slideId: "",
    idType: 0,
    heading: "",
    submitUpdate: () => {}
};

export default UpdateSlideHeading;