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

function SlideParagraph({ heightBox, variantCode, variantHeading, variantParagraph, marginTopCode, marginTopHeading, marginTopParagraph, heading, paragraph, code }) {
    return (
        <Box style={{ height: heightBox}}>
            <Box marginTop={marginTopCode}>
                <Typography align="center" variant={variantCode}>
                    {code}
                </Typography>
                <Typography style={{ marginTop: marginTopHeading }} align="center" variant={variantHeading}>
                    {heading}
                </Typography>
                <Typography style={{ marginTop: marginTopParagraph }} align="center" variant={variantParagraph}>
                    {paragraph}
                </Typography>
            </Box>
        </Box>
    );
};

SlideParagraph.propTypes = {
    variantCode: PropTypes.string.isRequired,
    variantHeading: PropTypes.string.isRequired,
    variantParagraph: PropTypes.string.isRequired,
    heightBox: PropTypes.string.isRequired,

    marginTopCode: PropTypes.number.isRequired,
    marginTopHeading: PropTypes.number.isRequired,
    marginTopParagraph: PropTypes.number.isRequired,
    heading: PropTypes.string,
    paragraph: PropTypes.string,
    code: PropTypes.number,
};

SlideParagraph.defaultProps = {
    heading: "Heading",
    paragraph: "Paragraph",
    code: 0
}

export default SlideParagraph;