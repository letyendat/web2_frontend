/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import slideParagraphApi from '../../../../../api/slideParagraphApi';
import UpdateSlideParagraphForm from '../UpdateSildeParagraphForm';


function UpdateSlideParagraph(props) {
    const { enqueueSnackbar } = useSnackbar();
    const {slideId, idType , heading, paragraph, submitUpdate} = props;

    const handleSubmit = async (values) => {
        try {
            const resp = await slideParagraphApi.updateSlideParagraph({
                id: slideId,
                heading: values.heading,
                paragraph: values.paragraph,
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
        <UpdateSlideParagraphForm paragraph={paragraph} heading={heading} onSubmit={handleSubmit}/>
    );
}

UpdateSlideParagraph.propTypes = {
    slideId: PropTypes.string,
    idType: PropTypes.number,
    heading: PropTypes.string,
    paragraph: PropTypes.string,
    submitUpdate: PropTypes.func,
};

UpdateSlideParagraph.defaultProps = {
    slideId: "",
    idType: 0,
    heading: "",
    paragraph: "",
    submitUpdate: () => {}
};

export default UpdateSlideParagraph;