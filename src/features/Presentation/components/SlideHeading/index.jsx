/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import Swiper core and required modules
import { Keyboard, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Box, Container, Paper, Typography } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import MultipleChoice from '../Chart/multipleChoice';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function SlideHeading({ heightBox, variantCode, variantHeading, marginTopCode, marginTopHeading, heading, code }) {
    return (
        <Box style={{height:heightBox}}>
            <Box marginTop={marginTopCode}>
                <Typography align="center" variant={variantCode}>
                    {code}
                </Typography>
                <Typography style={{ marginTop: marginTopHeading }} align="center" variant={variantHeading}>
                    {heading}
                </Typography>
            </Box>
        </Box>
    );
};

SlideHeading.propTypes = {
    variantCode: PropTypes.string.isRequired,
    variantHeading: PropTypes.string.isRequired,
    heightBox: PropTypes.string.isRequired,
    marginTopCode: PropTypes.string.isRequired,
    marginTopHeading: PropTypes.string.isRequired,
    heading: PropTypes.string,
    code: PropTypes.number,
};

SlideHeading.defaultProps = {
    heading: "Heading",
    code: 0
}

export default SlideHeading;