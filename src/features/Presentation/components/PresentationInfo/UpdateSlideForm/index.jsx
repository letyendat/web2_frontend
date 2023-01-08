/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-shorthand */
/* eslint-disable react/forbid-prop-types */
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
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../../../components/form-controls/InputField';
import GroupsIcon from '@mui/icons-material/Groups';

const theme = createTheme();

UpdateSlideForm.propTypes = {
    onSubmit: PropTypes.func,
    question: PropTypes.string,
    labels: PropTypes.array,
};

function UpdateSlideForm(props) {
    const { onSubmit, question, labels } = props;

    const schema = yup.object().shape({
        question: yup.string().required('Please enter question').min(2, 'question is too short'),
        // labels: yup.array().required('Please enter labels').min(2, 'Labels is too short'),
    });
    const form = useForm({
        defaultValues: {
            question: question,
            labels: labels,
        },
        resolver: yupResolver(schema),
    });
    // console.log(labels)

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "labels"
    });


    // console.log(fields)
    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values);
        }
    };

    const { isSubmitting } = form.formState

    return (
        <Box
            sx={{

                paddingLeft: 2,
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
                <InputField name="question" label="Question" form={form} />

                <Button
                    sx={{
                        marginTop: 3,
                        marginBottom: 1,
                        marginLeft: 0,
                        backgroundColor: "#26a69a"
                    }}
                    variant="contained"
                    onClick={() => {
                        append({ labels: "Option" });
                    }}
                    startIcon={<AddIcon />}
                >
                    Add label
                </Button>

                {fields.map((item, index) => (
                    <Box key={item.id} sx={{ display: "inline-flex" }}>
                        <Controller
                            defaultValue={labels[index]}
                            control={form.control}
                            name={`labels[${index}].labels`}
                            render={({
                                field: { onChange, value },
                                fieldState: { invalid, isTouched, isDirty, error },
                                formState
                            }) => (
                                <TextField
                                    error={!!form.errors?.labels}
                                    helperText={form.errors?.labels && `${form.errors?.labels.message}`}
                                    onChange={onChange}
                                    value={value}
                                    margin="normal"
                                    fullWidth
                                    label={`Label - ${index + 1}`}
                                    id="labels"
                                    size="small"
                                />
                            )}
                        />
                        <Button
                            sx={{
                                marginTop: 2,
                                marginBottom: 2,
                                marginLeft: 3,
                                color: "black",
                                backgroundColor: "#26a69a"
                            }}
                            variant="contained"
                            onClick={() => {
                                remove(index);
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                    </Box>


                ))}


                {
                    isSubmitting &&
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                }



                <Button sx={{
                    marginTop: 2,
                    marginLeft: 26,
                    backgroundColor: "#26a69a"
                }}
                    disabled={isSubmitting} type="submit" variant="contained" color="primary">
                    Update
                </Button>
            </form>


        </Box>
    );
}

export default UpdateSlideForm;
