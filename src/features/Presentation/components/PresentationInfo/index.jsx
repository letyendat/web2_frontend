import React from 'react';
// import PropTypes from 'prop-types';
import { Grid, Box, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Slide from '../Slide';

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

function PresentationInfo() {
    const classes = useStyles();

    return (
        <Box>
            <Button sx={{ backgroundColor: '#afa98e', marginLeft: 190 }}>
                <Link className={classes.link} to="/present/:presentationId/slide">
                    Present
                </Link>
            </Button>

            <Grid container spacing={1}>
                <Grid className={classes.left} item>
                    <Paper elevation={1}>
                        <Paper elevation={3}>
                            <Box border={0.5} width={278} height={230}>
                                <Slide variant="subtitle1" marginTop={2} />
                            </Box>
                        </Paper>


                        <Paper elevation={3}>
                            <Box border={0.5} width={278} height={230}>
                                <Slide variant="subtitle1" marginTop={2} />
                            </Box>
                        </Paper>
                    </Paper>
                </Grid>

                <Grid className={classes.right} item>
                    <Paper elevation={1}>
                        <Slide variant="h3" marginTop={8} />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

PresentationInfo.propTypes = {

};

export default PresentationInfo;