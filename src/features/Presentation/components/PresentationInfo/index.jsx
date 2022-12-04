/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Grid, Box, Paper, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import socketIOClient from 'socket.io-client';

import Slide from '../Slide';
import slideApi from '../../../../api/slideApi';
import presentationApi from '../../../../api/presentationApi';


const useStyles = makeStyles(() => ({
    root: {

    },

    left: {
        width: '300px',
    },

    link: {
        "text-decoration": "none",
        "color": "white",
    },

    right: {
        flex: '1 1 0'
    },
}));

function PresentationInfo({ socket }) {
    const { enqueueSnackbar } = useSnackbar();

    const classes = useStyles();
    const { presentationId } = useParams();

    const [presentation, setPresentation] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await presentationApi.get({
                    id: presentationId,
                });

                setPresentation(response.data);
            } catch (error) {
                console.log("failed");
            }

        })();
    }, []);



    const [slide, setSlide] = useState({});
    const handleOnClickCreateMultipleChoice = async () => {
        try {
            // console.log(e);
            const response = await slideApi.createSlide({
                presentationId,
            });

            if (response.status === true) {
                enqueueSnackbar("Send slide successfully!!", {
                    variant: "success",
                    autoHideDuration: 1000
                });
                setSlide(response)
            } else {
                enqueueSnackbar("Send slide fail", {
                    variant: "error",
                    autoHideDuration: 1000
                });
            }
        } catch (error) {
            enqueueSnackbar("Send slide fail", {
                variant: "error",
                autoHideDuration: 1000
            });
        }
    };

    const [slideList, setSlideList] = useState([]);
    const [loadingSlideList, setLoadingSlideList] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await slideApi.getAllSlides({
                    presentationId,
                });
                setSlideList(response.data);
            } catch (error) {
                console.log("failed");
            }

            setLoadingSlideList(false);
        })();
    }, [slide]);

    const [slideChoice, setSlideChoice] = useState(null);
    const handleOnClickOneSlide = (event, item) => {
        setSlideChoice(item)
    };

    useEffect(() => {
        const messageListener = async (value) => {
            // setSlide(value);
            try {
                const response = await slideApi.getSlideDetail(value.id);
                if (response.status === true) {
                    setSlide(response.data);
                    setSlideChoice(response.data.data)

                }
            } catch (error) {
                console.log("fail")
            }
        };

        // const deleteMessageListener = (messageID) => {
        //     setMessage((prevMessages) => {
        //         const newMessages = { ...prevMessages };
        //         delete newMessages[messageID];
        //         return newMessages;
        //     });
        // };

        socket?.on('message', messageListener);
        // socket.on('deleteMessage', deleteMessageListener);
        // socket.emit('getMessages');

        // return () => {
        //     // socket.off('message', messageListener);
        //     // socket.off('deleteMessage', deleteMessageListener);
        // };
    }, [socket]);

    const handleOnClickDeleteSlide = async () => {
        try {
            // console.log(e);
            const response = await slideApi.delete({
                id: slideChoice,
            });

            if (response.status === true) {
                enqueueSnackbar("Delete slide successfully!!", {
                    variant: "success",
                    autoHideDuration: 1000
                });
                setSlideChoice(null)
                setSlide({})

            } else {
                enqueueSnackbar("Delete slide fail", {
                    variant: "error",
                    autoHideDuration: 1000
                });
            }
        } catch (error) {
            enqueueSnackbar("Delete slide fail", {
                variant: "error",
                autoHideDuration: 1000
            });
        }
    };
    return (
        <Box>
            <Button onClick={handleOnClickCreateMultipleChoice} sx={{ backgroundColor: '#afa98e' }}>
                Create Multiple Choice
            </Button>
            <Button onClick={handleOnClickDeleteSlide} sx={{ marginLeft: '20px',backgroundColor: '#afa98e' }}>
                Delete Slide
            </Button>
            <Button sx={{ backgroundColor: '#afa98e', marginLeft: 190 }}>
                <Link className={classes.link} to="/present/:presentationId/slide">
                    Present
                </Link>
            </Button>


            <Grid container spacing={1}>
                <Grid className={classes.left} item>
                    <Paper elevation={1}>
                        {slideList.map((item) => (
                            <Button onClick={event => handleOnClickOneSlide(event, item)}>
                                <Paper elevation={3}>
                                    <Box border={0.5} width={278} height={230}>
                                        <Slide variant="subtitle1" marginTop={2} question={item.question} />
                                    </Box>
                                </Paper>
                            </Button>
                        ))}
                    </Paper>
                </Grid>

                <Grid className={classes.right} item>
                    <Paper elevation={1}>
                        {   slideChoice ? 
                            <Slide variant="h3" marginTop={8} labels={slideChoice.labels} datas={slideChoice.datas} question={slideChoice.question} code={presentation.data?.code} />
                            :
                            <div/>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

PresentationInfo.propTypes = {

};

export default PresentationInfo;