/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@mui/material';
import Member from '../Member';


function GroupMemberList({ data }) {
    return (
        <Box>
            {/* <Grid container spacing={2}> */}
                {data.map((member) => (
                    <Grid item key={member.user_id._id} xs={12} sm={6} md={4} lg={2}>
                        <Member member={member} />
                    </Grid>
                ))}
            {/* </Grid> */}
        </Box>
    );
}

GroupMemberList.propTypes = {
    data: PropTypes.array,
};

GroupMemberList.defaultProps = {
    data: [],
}

export default GroupMemberList;