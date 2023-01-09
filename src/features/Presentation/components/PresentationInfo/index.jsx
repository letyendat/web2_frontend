/* eslint-disable prefer-const */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable dot-notation */
/* eslint-disable spaced-comment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Grid, Box, Paper, Button, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Badge from '@mui/material/Badge';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import { red, teal, grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '../Slide';
import SlideHeading from '../SlideHeading';
import SlideParagraph from '../SlideParagraph';
import slideApi from '../../../../api/slideApi';
import slideHeadingApi from '../../../../api/slideHeadingApi';
import slideParagraphApi from '../../../../api/slideParagraphApi';
import UpdateSlide from './UpdateSilde';
import presentationApi from '../../../../api/presentationApi';
import Chat from '../Chat';
import UpdateSlideHeading from './UpdateSildeHeading';
import UpdateSlideParagraph from './UpdateSildeParagraph';

const useStyles = makeStyles(() => ({
	root: {},

	left: {
		width: '300px',
	},

	link: {
		'text-decoration': 'none',
		color: 'white',
	},

	right: {
		flex: '1 1 0',
	},
}));

function PresentationInfo({ socket }) {
	const loggedInUser = useSelector((state) => state.user.current);
	const idloggedUser = loggedInUser?._id;
	const { enqueueSnackbar } = useSnackbar();

	const classes = useStyles();
	const { presentationId } = useParams();

	const [loadingSlideList, setLoadingSlideList] = useState(true);
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


	const [slideChoice, setSlideChoice] = useState(null);
	const handleOnClickOneSlide = (event, item) => {
		setSlideChoice(item);
	};

	const [openDialogCreateSlide, setOpenDialogCreateSlide] = useState(false);
	const handleClickOpenDialogCreateSlide = () => {
		setOpenDialogCreateSlide(true);
	};

	const handleCloseDialogCreateSlide = () => {
		setOpenDialogCreateSlide(false);
	};

	const handleOnClickCreateSlide = async (slideType) => {
		try {
			let response;
			if (slideType === 1) {
				response = await slideApi.createSlide({
					presentationId,
				});
			} else if (slideType === 2) {
				response = await slideHeadingApi.createSlideHeading({
					presentationId,
				});
			} else if (slideType === 3) {
				response = await slideParagraphApi.createSlideParagraph({
					presentationId,
				});
			}


			if (response.status === true) {
				enqueueSnackbar('Send slide successfully!!', {
					variant: 'success',
					autoHideDuration: 1000,
				});
				setSlideChoice(response)
				handleCloseDialogCreateSlide()
			} else {
				enqueueSnackbar('Send slide fail', {
					variant: 'error',
					autoHideDuration: 1000,
				});
			}
		} catch (error) {
			enqueueSnackbar('Send slide fail', {
				variant: 'error',
				autoHideDuration: 1000,
			});
		}
	};


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

			setLoadingSlideList(false);
		})();
	}, [slideChoice]);



	const [countMessage, setCountMessage] = useState(0);

	useEffect(() => {
		const multiChoiceListener = async (value) => {
			try {
				const response = await slideApi.getSlideDetail(value.data._id);
				if (response.status === true) {
					setSlideChoice(response.data.data)
				}
			} catch (error) {
				console.log("fail")
			}
		};

		socket?.on('multiChoice', multiChoiceListener);
		const [openDialogChat, setOpenDialogChat] = useState(false);

		const messageListener = (message) => {
			if (message.owner_id?._id !== idloggedUser) {
				const today = new Date();
				const date = new Date(message.createdAt);
				const timestamp1 = date.getTime();
				const timestamp2 = today.getTime();

				console.log(timestamp2)
				console.log(timestamp1)
				console.log(timestamp2 - timestamp1)

				if (((timestamp2 - timestamp1) < 600) && (openDialogChat===false)){
					setCountMessage((count) => {
						const newCount = count + 1;
						return newCount;
					});
				}
			}
		};
		socket?.on('message', messageListener);
	}, [socket]);

	const handleOnClickDeleteSlide = async () => {
		try {
			let response;
			if (slideChoice.slide_type === 1) {
				response = await slideApi.delete({
					id: slideChoice,
				});
			} else if (slideChoice.slide_type === 2) {
				response = await slideHeadingApi.delete({
					id: slideChoice,
				});
			} else if (slideChoice.slide_type === 3) {
				response = await slideParagraphApi.delete({
					id: slideChoice,
				});
			}

			if (response.status === true) {
				enqueueSnackbar('Delete slide successfully!!', {
					variant: 'success',
					autoHideDuration: 1000,
				});
				setSlideChoice(null);
			} else {
				enqueueSnackbar('Delete slide fail', {
					variant: 'error',
					autoHideDuration: 1000,
				});
			}
		} catch (error) {
			enqueueSnackbar('Delete slide fail', {
				variant: 'error',
				autoHideDuration: 1000,
			});
		}
	};

	const handleOnClickOpenDialogChat = () => {
		setCountMessage(0);
		setOpenDialogChat(!openDialogChat);
	};

	const handleCloseDialogChat = () => {
		setOpenDialogChat(false);
	};

	const submitUpdateSlide = async (slideId, idType) => {
		try {
			const response = await presentationApi.getSlidesOfPresentation({
				id: presentationId,
			});
			if (response.status === true) {
				setSlideList(response.data.data);
			}

			if (idType === 1) {
				const responsex = await slideApi.getSlideDetail(slideId);
				if (responsex.status === true) {
					setSlideChoice(responsex.data.data)
				}
			} else if (idType === 2) {
				const responsex = await slideHeadingApi.getSlideHeadingDetail(slideId);
				if (responsex.status === true) {
					setSlideChoice(responsex.data.data)
				}
			} else if (idType === 3) {
				const responsex = await slideParagraphApi.getSlideParagraphDetail(slideId);
				if (responsex.status === true) {
					setSlideChoice(responsex.data.data)
				}
			}

		} catch (error) {
			console.log('failed');
		}
	}

	let linkPresent = "/presentation/" + presentation.data?._id + "/slide";
	return (
		<Box>
			<Box
				display="flex"
				borderBottom={1}
				pb={1}
				borderColor={grey[200]}
				alignItems="center"
				mt={1}
			>
				<IconButton>
					<ArrowBackIcon
						sx={{
							color: 'black',
							fontSize: 18,
						}}
					/>
				</IconButton>
				<Box
					sx={{
						marginLeft: 2,
					}}
				>
					<Typography>{presentation.data?.name}</Typography>
				</Box>
				<Button
					sx={{
						backgroundColor: teal[400],
						marginLeft: 'auto',
						textTransform: 'none',
						padding: `8px 16px`,
					}}
					startIcon={
						<PlayArrowIcon
							sx={{
								color: 'white',
								fontSize: 14,
								fontWeight: 600,
							}}
						/>
					}
				>
					<Link className={classes.link} to={linkPresent}>
						Present
					</Link>
				</Button>
			</Box>

			<Box
				py={1}
				display="flex"
				borderBottom={1}
				pb={1}
				mb={1}
				borderColor={grey[200]}
				alignItems="center"
			>
				<Button
					onClick={handleClickOpenDialogCreateSlide}
					sx={{
						backgroundColor: teal[400],
						textTransform: 'none',
						color: 'white',
						padding: `8px 16px`,
					}}
					startIcon={<AddIcon />}
				>
					New Slide
				</Button>
				<Button
					onClick={handleOnClickDeleteSlide}
					sx={{
						marginLeft: '20px',
						backgroundColor: red[400],
						textTransform: 'none',
						color: 'white',
						padding: `8px 16px`,
					}}
					startIcon={<DeleteIcon />}
				>
					Delete Slide
				</Button>
			</Box>

			<Box
				sx={{
					display: 'flex',
					backgroundColor: grey[100],
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						backgroundColor: 'white',
						height: `calc(100vh - 200px)`,
						overflowY: 'scroll',
						flex: 1,
					}}
				>
					{slideList.map((item) => (
						item.slide_type === 1 ? (
							<Button onClick={(event) => handleOnClickOneSlide(event, item)}>
								<Paper elevation={3}>
									<Box
										width={180}
										height={120}
										borderRadius={2}
										sx={{
											overflow: 'hidden',
										}}
									>
										<Slide
											variant="subtitle1"
											marginTop={2}
											question={item.question}
										/>
									</Box>
								</Paper>
							</Button>
						) : (
							item.slide_type === 2 ? (
								<Button onClick={(event) => handleOnClickOneSlide(event, item)}>
									<Paper elevation={3}>
										<Box
											width={180}
											height={120}
											borderRadius={2}
											sx={{
												overflow: 'hidden',
											}}
										>
											<SlideHeading
												variantCode="body2"
												variantHeading="body2"
												marginTopCode="2px"
												marginTopHeading="20px"
												heading={item.heading}
												code={presentation.data?.code}
											/>
										</Box>
									</Paper>
								</Button>
							) : (
								item.slide_type === 3 ? (
									<Button onClick={(event) => handleOnClickOneSlide(event, item)}>
										<Paper elevation={3}>
											<Box
												width={180}
												height={120}
												borderRadius={2}
												sx={{
													overflow: 'hidden',
												}}
											>
												<SlideParagraph
													variantCode="subtitle1"
													variantHeading="caption"
													variantParagraph="caption"
													marginTopCode="2px"
													marginTopHeading="20px"
													marginTopParagraph="20px"
													heading={item.heading}
													paragraph={item.paragraph}
												/>
											</Box>
										</Paper>
									</Button>
								) : (
									<div></div>
								)
							)
						)
					))}
				</Box>

				<Box
					sx={{
						padding: 2,
						flex: 5,
					}}
				>
					<Paper elevation={1}>
						{slideChoice ? (
							slideChoice.slide_type === 1 ? (
								<Slide
									heightBox={800}
									labels={slideChoice.labels}
									datas={slideChoice.datas}
									question={slideChoice.question}
									code={presentation.data?.code}
								/>
							) : (
								slideChoice.slide_type === 2 ? (
									<SlideHeading
										heightBox={800}
										variantCode="subtitle1"
										variantHeading="h3"
										marginTopCode="5px"
										marginTopHeading="200px"
										heading={slideChoice.heading}
										code={presentation.data?.code}
									/>
								) : (
									slideChoice.slide_type === 3 ? (
										<SlideParagraph
											heightBox={800}
											variantCode="subtitle1"
											variantHeading="h3"
											variantParagraph="h6"
											marginTopCode="5px"
											marginTopHeading="80px"
											marginTopParagraph="80px"
											heading={slideChoice.heading}
											paragraph={slideChoice.paragraph}
											code={presentation.data?.code}
										/>
									) : (
										<div />
									)
								)
							)
						) : (
							<div />
						)}
					</Paper>
				</Box>

				<Box
					sx={{
						backgroundColor: 'white',
						flex: 1,
					}}
				>
					{slideChoice ? (
						slideChoice.slide_type === 1 ? (
							< UpdateSlide submitUpdate={submitUpdateSlide} slideId={slideChoice._id} idType={slideChoice.slide_type} question={slideChoice.question} labels={slideChoice.labels} datas={slideChoice.datas} />
						) : (
							slideChoice.slide_type === 2 ? (
								< UpdateSlideHeading submitUpdate={submitUpdateSlide} slideId={slideChoice._id} idType={slideChoice.slide_type} heading={slideChoice.heading} />
							) : (
								slideChoice.slide_type === 3 ? (
									< UpdateSlideParagraph submitUpdate={submitUpdateSlide} slideId={slideChoice._id} idType={slideChoice.slide_type} heading={slideChoice.heading} paragraph={slideChoice.paragraph} />
								) : (
									<div />
								)
							)
						)

					) : (<div />)}

				</Box>
			</Box>

			<Box
				sx={{
					position: 'absolute',
					bottom: 8,
					right: 16,
					width: 40,
					height: 40,
					backgroundColor: 'rgb(37 47 69)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: '50%',
					cursor: 'pointer',
				}}
				onClick={handleOnClickOpenDialogChat}
			>
				<Badge color="secondary" badgeContent={countMessage}>
					<ChatIcon
						style={{
							color: 'white',
							fontSize: 24,
						}}
					/>
				</Badge>

			</Box>
			{openDialogChat && (
				<Chat
					handleClose={handleCloseDialogChat}
					socket={socket}
					presentationId={presentationId}
				/>
			)}

			<Dialog
				open={openDialogCreateSlide}
				onClose={handleCloseDialogCreateSlide}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				maxWidth={600}
			>
				<DialogContent >
					<Button onClick={() => handleOnClickCreateSlide(1)}>
						<Paper elevation={3}>
							<Box
								width={180}
								height={120}
								borderRadius={2}
								sx={{
									overflow: 'hidden',
								}}
							>
								<Slide
									variant="subtitle1"
									marginTop={2}
									question="Multichoice Slide"
								/>
							</Box>
						</Paper>
					</Button>

					<Button onClick={() => handleOnClickCreateSlide(2)}>
						<Paper elevation={3}>
							<Box
								width={180}
								height={120}
								borderRadius={2}
								sx={{
									overflow: 'hidden',
								}}
							>
								<SlideHeading
									variant="subtitle1"
									marginTop={2}
									heading="Heading Slide"
								/>
							</Box>
						</Paper>
					</Button>

					<Button onClick={() => handleOnClickCreateSlide(3)}>
						<Paper elevation={3}>
							<Box
								width={180}
								height={120}
								borderRadius={2}
								sx={{
									overflow: 'hidden',
								}}
							>
								<SlideParagraph
									variant="subtitle1"
									marginTop={2}
									heading="Paragraph Slide"
								/>
							</Box>
						</Paper>
					</Button>

				</DialogContent>
			</Dialog>
		</Box>


	);
}

PresentationInfo.propTypes = {};

export default PresentationInfo;
