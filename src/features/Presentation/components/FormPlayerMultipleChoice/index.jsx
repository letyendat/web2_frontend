/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { teal, red } from '@mui/material/colors';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import slideApi from '../../../../api/slideApi';
import presentationApi from '../../../../api/presentationApi';

import SlideHeading from '../SlideHeading';
import SlideParagraph from '../SlideParagraph';
import InputField from '../../../../components/form-controls/InputField'

export default function FormPlayerMultipleChoice({ socket }) {
  const { enqueueSnackbar } = useSnackbar();


  // const [loadingSlideList, setLoadingSlideList] = useState(true);

  const schema = yup.object().shape({
    code: yup.string().required('Please enter code.')
  });
  const form = useForm({
    defaultValues: {
      code: 0,
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = form.formState
  const [code1, setCode1] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);
  const onValueChange = (event) => {
    setSelectedOption(event.target.value);
    event.target.value = null;
  }

  const [slideList, setSlideList] = useState([]);
  const handleSubmit = async (values) => {
    try {

      const response = await presentationApi.getSlidesByCode({
        code: values.code,
      });

      if (response.status === true) {
        setCode1(values.code);
        setSlideList(response.data.data);
      } else {
        enqueueSnackbar("getSlidesByCode fail", {
          variant: "error",
          autoHideDuration: 1000
        });
      }

    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: "error",
        autoHideDuration: 1000
      });
    }
  }

  const [isSubmitChoice, setIsSubmitChoice] = useState(false);
  const [indexSlides, setIndexSlides] = useState(0);
  const onSubmitValueRadio = async (event) => {
    try {
      setIsSubmitChoice(true)

      event.preventDefault();
      socket.emit('multiChoice', { id: slideList[indexSlides]?._id, index: selectedOption })
      // eslint-disable-next-line no-param-reassign
    } catch (error) {
      console.log("fail")
    }
  }
  useEffect(() => {
    const presentationListener = async (value) => {
      try {
        console.log(value.code)
        console.log(code1)

        // if (value.code == code1) {
        //   console.log(11111)
        setIsSubmitChoice(false);
        setIndexSlides(value.index);

        // }
      } catch (error) {
        console.log("fail")
      }
    };

    socket?.on('presentation', presentationListener);
  }, [socket]);
  return (
    <Box>
      {(slideList.length !== 0) ? <div />
        : <form onSubmit={form.handleSubmit(handleSubmit)}>
          <InputField name="code" label="Code" form={form} />
          {
            isSubmitting &&
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          }

          <Button sx={{
            marginTop: 2,
            backgroundColor: '#afa98e'
          }}
            disabled={isSubmitting} type="submit" variant="contained" color="primary" fullWidth>
            Enter
          </Button>
        </form>
      }

      {(slideList[indexSlides]?.slide_type === 1) ? (
        (isSubmitChoice === false) ? (
          <Box sx={{
            display: 'flex',
            marginTop: '4%',
          }}>
            <Container>
              <form id="create-course-form" onSubmit={onSubmitValueRadio}>

                <FormLabel>
                  <Box style={{ marginBottom: '30px', alignItems: "center", justifyContent: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Typography
                      sx={{
                        marginTop: "20px",
                        fontSize: 40,
                      }}
                    >
                      {slideList[indexSlides]?.question}
                    </Typography>
                  </Box>
                </FormLabel>

                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <Box style={{ alignItems: "center", justifyContent: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    {slideList[indexSlides]?.labels.map((option, index) => (
                      <Button
                        sx={{
                          width: '200px',
                          backgroundColor: teal[400],
                          marginBottom: '20px',
                          color: 'white',
                          padding: `8px 16px`,
                          marginRight: 2,
                          textTransform: 'none',
                        }}>
                        <FormControlLabel
                          key={option._id}
                          value={index}
                          control={<Radio />}
                          label={option}
                          checked={selectedOption == index}
                          onChange={onValueChange}
                        />
                      </Button>
                    ))}
                  </Box>

                </RadioGroup>
                <Box style={{ alignItems: "center", justifyContent: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Button
                    sx={{
                      width: '100px',
                      backgroundColor: teal[400],
                      marginBottom: '20px',
                      color: 'white',
                      padding: `8px 16px`,
                      marginRight: 2,
                      textTransform: 'none',
                    }}
                    type="submit">
                    Submit
                  </Button>
                </Box>
              </form>
            </Container>
          </Box>
        ) : (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Box style={{ marginTop: "8%", alignItems: "center", justifyContent: 'center', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <img style={{ width: "200px" }} src="https://i.imgur.com/8AF83CN.png" />
            <Typography
              sx={{
                marginTop: "20px",
                fontSize: 30,
              }}
            >
              Wait Next Slide
            </Typography>
          </Box>
        )
      ) : (
        (slideList[indexSlides]?.slide_type === 2) ? (
          <SlideHeading
            variantCode="subtitle1"
            variantHeading="h3"
            marginTopCode="20px"
            marginTopHeading="200px"
            heading={slideList[indexSlides]?.heading}
          // code={presentation.data?.code}
          />
        ) : (
          (slideList[indexSlides]?.slide_type === 3) ? (
            <SlideParagraph
              variantCode="subtitle1"
              variantHeading="h3"
              variantParagraph="h6"
              marginTopCode="5px"
              marginTopHeading="80px"
              marginTopParagraph="80px"
              heading={slideList[indexSlides]?.heading}
              paragraph={slideList[indexSlides]?.paragraph}
            // code={presentation.data?.code}
            />
          ) : (
            <div />
          )
        )
      )}
    </Box>
  );
}