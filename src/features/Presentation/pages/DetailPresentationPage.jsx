import { Box } from '@mui/material';
import React from 'react';
import PresentationInfo from '../components/PresentationInfo';
// import PropTypes from 'prop-types';



function DetailPresentationPage() {
    return (
        <Box padding={3}>
            <PresentationInfo/>
        </Box>
    );
}

DetailPresentationPage.propTypes = {
    
};

export default DetailPresentationPage;