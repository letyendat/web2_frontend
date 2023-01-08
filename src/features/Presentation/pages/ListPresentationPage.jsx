/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AddIcon from '@mui/icons-material/Add';
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogContent,
	Typography,
} from '@mui/material';
import { teal, red, grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import presentationApi from '../../../api/presentationApi';
import InputField from '../../../components/form-controls/InputField';
import Loading from '../../../components/Loading';
import GridPresentsTable from '../components/GridPresentsTable';

function ListPresentationPage() {
	const { enqueueSnackbar } = useSnackbar();
	const [checkList, setCheckList] = React.useState([]);
	const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);
	const schema = yup.object().shape({
		name: yup.string().required('Please enter name.'),
	});
	const form = useForm({
		defaultValues: {
			name: '',
		},
		resolver: yupResolver(schema),
	});
	const { isSubmitting } = form.formState;

	const [openDialogCreatePresentation, setDialogCreatePresentation] =
		useState(false);

	const handleCloseDialogCreatePresentation = () => {
		setDialogCreatePresentation(false);
	};
	const handleClickOpenDialogCreatePresentation = () => {
		setDialogCreatePresentation(true);
	};
	const handleSendInviteClick = async () => {
		handleClickOpenDialogCreatePresentation();
	};

	const [presentation, setPresentation] = useState({});
	const handleSubmitCreatePresentation = async (values) => {
		try {
			const response = await presentationApi.createPresentation(values);

			if (response.status === true) {
				enqueueSnackbar('Send presentation successfully!!', {
					variant: 'success',
					autoHideDuration: 1000,
				});
				setPresentation(response);
				setDialogCreatePresentation(false);
			} else {
				enqueueSnackbar('Send presentation fail', {
					variant: 'error',
					autoHideDuration: 1000,
				});
			}
		} catch (error) {
			enqueueSnackbar('Send presentation fail', {
				variant: 'error',
				autoHideDuration: 1000,
			});
		}
	};

	const [openDialogDeletePresentation, setOpenDialogDeletePresentation] =
		useState(false);

	const handleCloseDialogDeletePresentation = () => {
		setOpenDialogDeletePresentation(false);
	};
	const handleClickOpenDialogDeletePresentation = () => {
		setOpenDialogDeletePresentation(true);
	};
	const handleDeletePresentationClick = async () => {
		handleClickOpenDialogDeletePresentation();
	};

	const [presentationList, setPresentationList] = useState([]);
	const [loadingPresentationList, setLoadingPresentationList] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const response = await presentationApi.getAllPresentations();
				setPresentationList(response.data ?? []);
			} catch (error) {
				console.log('failed');
			}

			setLoadingPresentationList(false);
		})();
	}, [presentation]);

	const handleDeletePresent = (idPresentList) => {
		setCheckList(idPresentList);
	};

	const handleDeletePresentV2 = () => {
		try {
			checkList.forEach(async (item) => {
				const response = await presentationApi.delete({
					id: item,
				});

				if (response.status === true) {
					enqueueSnackbar('Delete presentation successfully!!', {
						variant: 'success',
						autoHideDuration: 1000,
					});
					setPresentation({});
				} else {
					enqueueSnackbar('Delete presentation fail', {
						variant: 'error',
						autoHideDuration: 1000,
					});
				}
			});
		} catch (error) {
			enqueueSnackbar('Delete presentation fail', {
				variant: 'error',
				autoHideDuration: 1000,
			});
		}
	};

	return (
		<Box padding={3}>
			{loadingPresentationList ? (
				<Loading />
			) : (
				<Box>
					{presentationList.length > 0 && (
						<Button
							onClick={handleSendInviteClick}
							sx={{
								backgroundColor: teal[400],
								marginBottom: '20px',
								color: 'white',
								padding: `8px 16px`,
								marginRight: 2,
								textTransform: 'none',
							}}
							startIcon={<AddIcon />}
						>
							<Typography
								sx={{
									fontSize: 14,
								}}
							>
								Create Presentation
							</Typography>
						</Button>
					)}
					{checkList.length > 0 && presentationList.length > 0 && (
						<Button
							onClick={handleDeletePresentationClick}
							sx={{
								backgroundColor: red[500],
								marginBottom: '20px',
								color: 'white',
								padding: `8px 16px`,
								textTransform: 'none',
							}}
							startIcon={<DeleteIcon />}
						>
							<Typography
								sx={{
									fontSize: 14,
								}}
							>
								Delete
							</Typography>
						</Button>
					)}
					{presentationList.length <= 0 ? (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								position: 'relative',
								top: 100,
								flexDirection: 'column',
							}}
						>
							<Box>
								<img
									src="https://htmlstream.com/front/assets/svg/illustrations/oc-empty-cart.svg"
									alt=""
									width={300}
									height={300}
								/>
							</Box>
							<Box sx={{ marginTop: 4 }}>
								<Typography>No presentations here yet!</Typography>
							</Box>
							<Typography sx={{ marginTop: 2 }}>
								Start creating interactive and engaging presentations to include
								your audience.
							</Typography>
							<Button
								onClick={handleSendInviteClick}
								sx={{
									backgroundColor: teal[400],
									marginBottom: '20px',
									color: 'white',
									padding: `8px 16px`,
									marginRight: 2,
									textTransform: 'none',
									marginTop: 2,
								}}
								startIcon={<AddIcon />}
							>
								<Typography
									sx={{
										fontSize: 14,
									}}
								>
									Create Presentation
								</Typography>
							</Button>
						</Box>
					) : (
						<GridPresentsTable
							data={presentationList}
							handleDeletePresent={handleDeletePresent}
						/>
					)}
				</Box>
			)}

			<Dialog
				open={openDialogCreatePresentation}
				onClose={handleCloseDialogCreatePresentation}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<Box
					style={{
						width: 400,
						height: 'auto',
					}}
				>
					<Box
						display="flex"
						justifyContent="space-between"
						borderBottom={1}
						borderColor={grey[200]}
						px={2}
						py={1}
						alignItems="center"
					>
						<Typography
							sx={{
								fontSize: 18,
								fontWeight: 500,
							}}
						>
							Add new present
						</Typography>
						<CloseIcon
							style={{
								fontSize: 18,
								cursor: 'pointer',
							}}
							onClick={() => setDialogCreatePresentation(false)}
						/>
					</Box>
					<Box p={2}>
						<form onSubmit={form.handleSubmit(handleSubmitCreatePresentation)}>
							<InputField name="name" label="Name" form={form} />
							{isSubmitting && (
								<Box sx={{ display: 'flex', justifyContent: 'center' }}>
									<CircularProgress />
								</Box>
							)}
							<Box
								display="flex"
								alignItems="center"
								justifyContent="flex-end"
								mt={2}
								flexDirection="row"
								flexGrow={1}
							>
								<Button
									sx={{
										textTransform: 'none',
										marginRight: 2,
										backgroundColor: teal[400],
									}}
									disabled={isSubmitting}
									type="submit"
									variant="contained"
									color="primary"
								>
									Create
								</Button>
								<Button
									onClick={handleCloseDialogCreatePresentation}
									autoFocus
									variant="outlined"
									style={{
										textTransform: 'none',
										borderColor: teal[400],
										color: teal[400],
									}}
								>
									Cancel
								</Button>
							</Box>
						</form>
					</Box>
				</Box>
			</Dialog>

			<Dialog
				open={openDialogDeletePresentation}
				onClose={handleCloseDialogDeletePresentation}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<Typography>Do you want remove this present ?</Typography>
					<Box
						display="flex"
						flexDirection="row"
						pt={2}
						justifyContent="flex-end"
					>
						<Button
							variant="contained"
							color="primary"
							sx={{
								marginRight: 1,
								backgroundColor: red[500],
							}}
							onClick={handleDeletePresentV2}
						>
							Delete
						</Button>
						<Button
							onClick={handleCloseDialogDeletePresentation}
							variant="outlined"
						>
							Cancel
						</Button>
					</Box>
				</DialogContent>
			</Dialog>
		</Box>
	);
}
export default ListPresentationPage;
