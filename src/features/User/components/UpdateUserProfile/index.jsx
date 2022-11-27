/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */


import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import userApi from '../../../../api/userApi';
// import { register } from '../../userSlice';
import UpdateUserProfileForm from '../UpdateUserProfileForm';


function UpdateUserProfile(props) {
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            const resp = await userApi.update(values);

            enqueueSnackbar("Update successfully!!", { variant: "success" });
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error" });
        }
    }

    return (
        <UpdateUserProfileForm onSubmit={handleSubmit} />
    );
}

UpdateUserProfile.propTypes = {

};

UpdateUserProfile.defaultProps = {

};

export default UpdateUserProfile;