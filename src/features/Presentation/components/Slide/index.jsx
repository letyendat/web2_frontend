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

function Slide({variant, marginTop}) {
    return (
        <Box>
            <Box marginTop={marginTop}>
                <Typography align="center" variant={variant}>
                    Ban Muon Co Nguoi Yeu Khong
                </Typography>
            </Box>
            <Box marginTop={marginTop}>
                <Container>
                    <MultipleChoice />
                </Container>
            </Box>
        </Box>
    );
};

Slide.propTypes = {
    variant: PropTypes.string.isRequired,
    marginTop: PropTypes.number.isRequired,
};

Slide.defaultProps = {
}

export default Slide;