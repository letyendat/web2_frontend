/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Checkbox, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { blue, grey } from '@mui/material/colors';

const columns = [
	{ id: 'check', label: '', minWidth: 50, align: 'center' },
	{ id: 'present', label: '', minWidth: 50, align: 'center' },
	{ id: 'stt', label: 'STT', minWidth: 50, align: 'center' },
	{
		id: 'name',
		label: 'Name',
		minWidth: 40,
		align: 'center',
	},
	{ id: 'createAt', label: 'Create At', minWidth: 100, align: 'center' },
	{
		id: 'updateAt',
		label: 'Update At',
		minWidth: 40,
		align: 'center',
	},
];

function createData(stt, name, createAt, updateAt, id) {
	return {
		stt,
		name,
		createAt,
		updateAt,
		id,
	};
}

export default function GridPresentsTable(props) {
	const { data, handleDeletePresent } = props;
	const navigate = useNavigate();
	// const [page, setPage] = React.useState(0);
	// const [rowsPerPage, setRowsPerPage] = React.useState(10);

	// function handleChangePage(event, newPage) {
	// 	setPage(newPage);
	// }

	// function handleChangeRowsPerPage(event) {
	// 	setRowsPerPage(Number(event.target.value));
	// 	setPage(0);
	// }

	const [checkList, setCheckList] = React.useState([]);

	const rows = data?.map((item, index) =>
		createData(index, item.name, item.createdAt, item.updatedAt, item._id)
	);

	const handleCheck = (id) => {
		if (checkList.includes(id)) {
			setCheckList(checkList.filter((item) => item !== id));
			handleDeletePresent(checkList.filter((item) => item !== id));
		} else {
			setCheckList((prev) => [...prev, id]);
			handleDeletePresent([...checkList, id]);
		}
	};

	const handleNavigate = (params) => {
		const url = `${params}`;
		navigate(url);
	};
	const boxSX = {
		width: 25,
		height: 25,
		backgroundColor: grey[100],
		borderRadius: '50%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		transition: "all .3s ease",
		'&:hover': {
			border: 'none',
			color: 'white',
			backgroundColor: blue[600],
		},
	};
	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
			<TableContainer sx={{ maxHeight: '90%' }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{
										minWidth: column.minWidth,
									}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
								{columns.map((column) => {
									const value = row[column.id];
									return (
										<TableCell key={column.id} align={column.align}>
											{column.id === 'check' ? (
												<Checkbox
													onChange={() => handleCheck(row.id)}
													checked={checkList.includes(row.id) || false}
												/>
											) : column.id === 'present' ? (
												<Box
													sx={boxSX}
													onClick={() => handleNavigate(row.id)}
												>
													<PlayArrowIcon
														style={{
															fontSize: 16,
														}}
													/>
												</Box>
											) : (
												value
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{/* <TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/> */}
		</Paper>
	);
}

GridPresentsTable.propTypes = {
	data: PropTypes.array,
	handleDeletePresent: PropTypes.func,
};

GridPresentsTable.defaultProps = {
	data: [],
	handleDeletePresent: (id) => {},
};
