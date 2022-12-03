/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes, useLocation } from 'react-router-dom';
import ListPresentationPage from './pages/ListPresentationPage';
import DetailPresentationPage from './pages/DetailPresentationPage';
import SlideList from './components/SlideList';


// PresentationFeature.propTypes = {
    
// };

function PresentationFeature(props) {
    return (
        <div>
            <Routes>
                <Route path="" exact element={<ListPresentationPage/>}/>
                <Route path="/:presentationId/slide" exact element={<SlideList/>}/>

                <Route path="/:presentationId" exact element={<DetailPresentationPage/>}/>
            </Routes>
        </div>
    );
}

export default PresentationFeature;