/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */

import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import GroupMemberList from '../GroupMemberList';
import groupApi from '../../../../api/groupApi';

const useStyles = makeStyles(() => ({
    root: {},

    // boxOne: {
    //     "borderRadius": "10px 10px"
    // },

    // boxTwo: {
    //     "borderRadius": "10px 10px"
    // },

    link: {
        "text-decoration": "none",
        "color": "black"
    }
}));

function GroupInfo({ groupInfo }) {
    const classes = useStyles();
    const [memberList, setMemberList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { enqueueSnackbar } = useSnackbar();

    const { group, data } = groupInfo;

    let groupName = "";
    let onwerName = "";
    let groupId = "";
    if (group) {
        groupName = group.data.name;
        groupId = group.data._id;
    }
    if (data) {
        onwerName = data[0].user_id.name;
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await groupApi.getAllGroupMembers(groupId);
                setMemberList(response.data);
            } catch (error) {
                console.log("failed");
            }

            setLoading(false);
        })();
    }, [groupId]);

    const handleDeleteMember = async (id) => {
        try {
			const response = await groupApi.deleteMember({
				groupId,
				userIdDelete: id
			});

			if (response.status === true) {
				enqueueSnackbar("Delete successfully!!", {
					variant: "success",
					autoHideDuration: 1000
				});

                try {
                    const responseGetAll = await groupApi.getAllGroupMembers(groupId);
                    setMemberList(responseGetAll.data);
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

    const handleUpdateRole = async (id, role) => {
        try {
			const response = await groupApi.updateRole({
				groupId,
				userIdUpdate: id,
                role,
			});

			if (response.status === true) {
				enqueueSnackbar("Update role successfully!!", {
					variant: "success",
					autoHideDuration: 1000
				});

                try {
                    const responseGetAll = await groupApi.getAllGroupMembers(groupId);
                    setMemberList(responseGetAll.data);
                } catch (error) {
                    console.log("failed");
                }
			} else {
				enqueueSnackbar("Update fail", {
					variant: "error",
					autoHideDuration: 1000
				});
			}
		} catch (error) {
			enqueueSnackbar("Update fail", {
				variant: "error",
				autoHideDuration: 1000
			});
		}
    };

    return (
        <Box>
            <Box padding={1} sx={{ backgroundColor: '#26a69a' }}>
                <Typography sx={{ color: 'white' }} variant="h5">Group Name: {groupName}</Typography>
                <Typography sx={{ color: 'white' }} variant="h6">Owner Group: {onwerName}</Typography>
            </Box>
            <Box marginTop={3}>
                <GroupMemberList data={memberList} handleDeleteMember={handleDeleteMember} handleUpdateRole={handleUpdateRole}/>
            </Box>
        </Box>
    );
}

GroupInfo.propTypes = {
    groupInfo: PropTypes.object,
};

GroupInfo.defaultProps = {
    groupInfo: {},
}

export default GroupInfo;