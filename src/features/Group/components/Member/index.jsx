/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
    root: {},


    link: {
        "text-decoration": "none",
        "color": "black"
    }
}));

function Member({ member }) {
    const classes = useStyles();

    return (
        // <Box padding={2}>
            <Box padding={2}>
                <Typography sx={{ color: 'black', fontFamily: 'Monospace' }} variant="h5">{member.user_id.name} : {member.user_id.email}</Typography>
            </Box>
        // </Box>
    );
}

Member.propTypes = {
    member: PropTypes.object,
};

Member.defaultProps = {
    member: {},
}

export default Member;