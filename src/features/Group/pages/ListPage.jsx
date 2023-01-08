/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */
import { Box, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import groupApi from '../../../api/groupApi';
import GroupList from '../components/GroupList';
import GroupSkeletonList from '../components/GroupSkeletonList';

const useStyles = makeStyles((theme) => ({
    root: {},

    left: {
        width: '250px',
    },

    right: {
        flex: '1 1 0',
    },

}));

function ListPage({ trigger }) {
    const classes = useStyles();
    const stateCallApiGetAllGroup = useSelector(state => state.group)

    const [groupList, setGroupList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        (async () => {
            try {
                const response = await groupApi.getAllGroups();
                setGroupList(response.data);
            } catch (error) {
                console.log("failed");
            }

            setLoading(false);
        })();
    }, [stateCallApiGetAllGroup]);

    const handleDeleteGroup = async (groupId) => {
        try {
            console.log(groupId)
			const response = await groupApi.deleteGroup({
				groupId,
			});

			if (response.status === true) {
				enqueueSnackbar("Delete successfully!!", {
					variant: "success",
					autoHideDuration: 1000
				});

                try {
                    const responseGetAll = await groupApi.getAllGroups();
                    console.log(responseGetAll.data);
                    setGroupList(responseGetAll.data);
                } catch (error) {
                    console.log("failed");
                }
			} else {
				enqueueSnackbar("Delete fail", {
					variant: "error",
					autoHideDuration: 1000
				});
			}
		} catch (error) {
			enqueueSnackbar("Delete fail", {
				variant: "error",
				autoHideDuration: 1000
			});
		}
    };

    return (
        <Box padding={3}>
            {/* <Container> */}
            <Grid container spacing={1}>
                <Grid item className={classes.right}>
                    <Paper elevation={0}>
                        {loading ? <GroupSkeletonList length={6} /> : <GroupList data={groupList} handleDeleteGroup={handleDeleteGroup} />}
                    </Paper>
                </Grid>
            </Grid>
            {/* </Container> */}
        </Box>
    );
}

ListPage.propTypes = {
    trigger: PropTypes.bool,
};

ListPage.defaultProps = {
    trigger: false,
}

export default ListPage;