/* eslint-disable object-shorthand */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/require-default-props */
/* eslint-disable no-use-before-define */
import { yupResolver } from '@hookform/resolvers/yup';
// import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../../components/form-controls/InputField';
import GroupsIcon from '@mui/icons-material/Groups';

const theme = createTheme();

UpdateSlideHeadingForm.propTypes = {
    onSubmit: PropTypes.func,
    heading: PropTypes.string,
};

const useStyles = makeStyles(() => ({
    root: {

    },
    link: {
        "margin-top": "15px",
        "text-decoration": "none"
    }
}));

function UpdateSlideHeadingForm(props) {
    const {onSubmit, heading} = props;

    const schema = yup.object().shape({
        heading: yup.string().required('Please enter heading').min(2, 'heading is too short'),
    });
    const form = useForm({
        defaultValues: {
            heading: heading,
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values);
        }
    };

    const { isSubmitting } = form.formState

    return (
            <Box
                sx={{

                    paddingLeft:2,
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h5" variant="h6">
                    Update Multiple Slide
                </Typography>

                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <InputField name="heading" label="Heading" form={form} />
                    {
                        isSubmitting &&
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    }

                    <Button sx={{
                        marginTop: 2,
                        marginLeft: 26,
                    }}
                        disabled={isSubmitting} type="submit" variant="contained" color="primary">
                        Update
                    </Button>
                </form>
            </Box>
    );
}

export default UpdateSlideHeadingForm;
