/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import userApi from '../../../../api/userApi';
import StorageKeys from '../../../../constants/storage-keys';
// import { register } from '../../userSlice';
import UpdateUserProfileForm from '../UpdateUserProfileForm';


function UpdateUserProfile(props) {
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (values) => {
        try {
            const resp = await userApi.update(values);
            // localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

            enqueueSnackbar("Update successfully!!", { variant: "success" , autoHideDuration: 1000});
        } catch (error) {
            enqueueSnackbar(error.message, { variant: "error", autoHideDuration: 1000 });
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