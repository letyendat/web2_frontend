/* eslint-disable no-unused-vars */
import { Box, Button, Container, Dialog, DialogActions, DialogContent, Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { useParams } from 'react-router-dom';
import groupApi from '../../../api/groupApi';

import GroupInfo from '../components/GroupInfo';

const useStyles = makeStyles(() => ({
    root: {},

    left: {
        width: '300px',
    },

    right: {
        flex: '1 1 0',
    }
}));

function DetailPage(props) {
    const classes = useStyles();
    const { groupId } = useParams();

    const [group, setGroup] = useState({});
    const [loading, setLoading] = useState(true);

    const [inviteLink, setInviteLink] = useState("");
    const [openDialogCreateInviteLink, setDialogCreateInviteLink] = useState(false);

    const handleCloseDialogCreateInviteLink = () => {
        setDialogCreateInviteLink(false);
    };
    const handleClickOpenDialogCreateGroup = () => {
        setDialogCreateInviteLink(true);
    };
    const handleCreateInviteClick = async () => {
        const response = await groupApi.getInviteGroupLink(groupId);

        const inviteLinkFE = `http://localhost:3000/invite/${groupId}`
        if (response.data) {
            setInviteLink(inviteLinkFE);
            handleClickOpenDialogCreateGroup();
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await groupApi.getGroupDetail(groupId);
                setGroup(response);
            } catch (error) {
                console.log("failed");
            }

            setLoading(false);
        })();
    }, []);

    return (
        <Box padding={3}>
            <Container>
                <Grid container spacing={4}>
                    <Grid item className={classes.left}>
                        <Box sx={{ border: 1, borderRadius: 2, backgroundColor: '#afa98e' }}>
                            <IconButton color="inherit" onClick={handleCreateInviteClick}>
                                <LibraryAddIcon fontSize='large' />
                                <Typography sx={{ color: 'black', fontFamily: 'Monospace' }} variant="subtitle1"> :Create link invite</Typography>
                            </IconButton>
                        </Box>
                    </Grid>

                    <Grid item className={classes.right}>
                        <GroupInfo groupInfo={group} />
                    </Grid>
                </Grid>
            </Container>

            <Dialog
                open={openDialogCreateInviteLink}
                onClose={handleCloseDialogCreateInviteLink}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    {inviteLink}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogCreateInviteLink} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>


    );
}

// DetailPage.propTypes = {

// };

export default DetailPage;