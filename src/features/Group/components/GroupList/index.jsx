/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Group from '../Group';

function GroupList({ data, handleDeleteGroup }) {
    return (
        <Box>
            <Grid container spacing={2}>
                {data.map((group) => (
                    <Grid item key={group.group_id._id} xs={12} sm={6} md={4} lg={2}>
                        <Group group={group} handleDeleteGroup={handleDeleteGroup} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

GroupList.propTypes = {
    data: PropTypes.array,
    handleDeleteGroup: PropTypes.func,
};

GroupList.defaultProps = {
    data: [],
    handleDeleteGroup: () => {},
}

export default GroupList;