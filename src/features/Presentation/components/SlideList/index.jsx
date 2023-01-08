/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
// import Swiper core and required modules
import { Keyboard, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Box, Container, Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import presentationApi from '../../../../api/presentationApi';
import Slide from '../Slide';
import SlideHeading from '../SlideHeading';
import SlideParagraph from '../SlideParagraph';
import slideApi from '../../../../api/slideApi';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function SlideList({ socket }) {
    const { presentationId } = useParams();
    const [presentation, setPresentation] = useState({});
    useEffect(() => {
        (async () => {
            try {
                const response = await presentationApi.get({
                    id: presentationId,
                });

                setPresentation(response.data);
            } catch (error) {
                console.log('failed');
            }
        })();
    }, []);

    const [slideList, setSlideList] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await presentationApi.getSlidesOfPresentation({
                    id: presentationId,
                });
                setSlideList(response.data.data);
            } catch (error) {
                console.log('failed');
            }
        })();
    }, []);

    const [swiperIndex, setSwiperIndex] = useState(0);
    useEffect(() => {
        (async () => {
            try {
                socket?.emit('presentation', { code: presentation.data?.code, index: swiperIndex })
            } catch (error) {
                console.log('failed');
            }
        })();
    }, [swiperIndex]);

    useEffect(() => {
        const multiChoiceListener = async (value) => {
            try {
                const response = await slideApi.getSlideDetail(value.data._id);
                if (response.status === true) {
                    const responsex = await presentationApi.getSlidesOfPresentation({
                        id: presentationId,
                    });
                    setSlideList(responsex.data.data);
                }
            } catch (error) {
                console.log("fail")
            }
        };

        socket?.on('multiChoice', multiChoiceListener);
    }, [socket]);

    return (
        <Swiper
            onSlideChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
            slidesPerView={1}
            spaceBetween={30}
            keyboard={{
                enabled: true,
            }}
            pagination={{
                clickable: true,
            }}
            // navigation
            modules={[Keyboard, Navigation]}
            className="mySwiper"

        >
            {slideList.map((item, index) => (
                <Paper elevation={3}>
                    {item.slide_type === 1 ? (
                        <SwiperSlide virtualIndex={index}>
                            <Box
                                sx={{
                                    padding: 2,
                                    flex: 8,
                                }}
                            >
                                <Paper elevation={1} >
                                    <Slide
                                        heightBox={800}
                                        labels={item.labels}
                                        datas={item.datas}
                                        question={item.question}
                                        code={presentation.data?.code}
                                    />
                                </Paper>
                            </Box>
                        </SwiperSlide>
                    ) : (
                        item.slide_type === 2 ? (
                            <SwiperSlide virtualIndex={index}>
                                <Box
                                    sx={{
                                        padding: 2,
                                        flex: 8,
                                    }}
                                >
                                    <Paper elevation={1} >
                                        <SlideHeading
                                            heightBox={800}
                                            variantCode="subtitle1"
                                            variantHeading="h3"
                                            marginTopCode="5px"
                                            marginTopHeading="200px"
                                            heading={item.heading}
                                            code={presentation.data?.code}
                                        />
                                    </Paper>
                                </Box>
                            </SwiperSlide>
                        ) : (
                            item.slide_type === 3 ? (
                                <SwiperSlide virtualIndex={index}>
                                    <Box
                                        sx={{
                                            padding: 2,
                                            flex: 8,
                                        }}
                                    >
                                        <Paper elevation={1} >
                                            <SlideParagraph
                                                heightBox={800}
                                                variantCode="subtitle1"
                                                variantHeading="h3"
                                                variantParagraph="h6"
                                                marginTopCode="5px"
                                                marginTopHeading="80px"
                                                marginTopParagraph="80px"
                                                heading={item.heading}
                                                paragraph={item.paragraph}
                                                code={presentation.data?.code}
                                            />
                                        </Paper>
                                    </Box>
                                </SwiperSlide>
                            ) : (
                                <div />
                            )
                        )
                    )}
                </Paper>
            ))
            }

        </Swiper >
    );
};

export default SlideList;