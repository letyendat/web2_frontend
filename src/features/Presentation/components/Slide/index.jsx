/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import Swiper core and required modules
import { Keyboard, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Box, Container, Typography } from '@mui/material';

import { Swiper, SwiperSlide } from 'swiper/react';
import MultipleChoice from '../Chart/multipleChoice';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Slide({ heightBox, variant, marginTop, labels, datas, question, code }) {
    return (
        <Box style={{height:heightBox}}>
            <Box marginTop={marginTop}>
                <Typography align="center" variant={variant}>
                    {code}
                </Typography>
                <Typography align="center" variant={variant}>
                    {question}
                </Typography>
            </Box>
            <Box marginTop={marginTop}>
                <Container>
                    <MultipleChoice labels={labels} datas={datas} />
                </Container>
            </Box>
        </Box>
    );
};

Slide.propTypes = {
    variant: PropTypes.string.isRequired,
    marginTop: PropTypes.number.isRequired,
    heightBox: PropTypes.number.isRequired,
    labels: PropTypes.array,
    datas: PropTypes.array,
    question: PropTypes.string,
    code: PropTypes.number,
};

Slide.defaultProps = {
    labels: [],
    datas: [],
    question: "",
    code: 0
}

export default Slide;