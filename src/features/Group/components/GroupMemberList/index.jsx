/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import { Box, Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';
import * as React from 'react';
import Member from '../Member';

const columns = [
	{ field: 'stt', label: 'STT', minWidth: 70, align: 'center' },
	{ field: 'name', label: 'Name', width: 150 },
	{ field: 'email', label: 'Email', width: 150 },
	{ field: 'role', label: 'Role', width: 200 },
	{ field: 'setRole', label: '', width: 50 },
	{ field: 'delete', label: '', width: 50 },
];

function createData(stt, name, email, role, id) {
	return {
		stt,
		name,
		email,
		role,
		id,
	};
}

function GroupMemberList({ data, handleDeleteMember, handleUpdateRole }) {
	const rows = data?.map((member, index) =>
		createData(index+1, member.user_id.name, member.user_id.email, member.role_id.name, member.user_id._id)
	);

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
			<TableContainer sx={{ maxHeight: '90%' }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.field}
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
							<TableRow
								hover
								tabIndex={-1}
								key={row.name}
							>
								{columns.map((column) => {
									const value = row[column.field];
									return (
										<TableCell key={column.field} align={column.align}>
											{column.field === 'delete' ? (
												row.role !== 'owner' ? (
													<Button onClick={() => handleDeleteMember(row.id)}>
														<DeleteIcon htmlColor="black" />
													</Button>
												) : (
													<Button>
														<DeleteIcon color="disabled" />
													</Button>
												)
											) : (
												column.field === 'setRole' ? (
													row.role !== 'owner' ? (
														row.role === 'co-owner' ? (
															<Button onClick={() => handleUpdateRole(row.id, 3)}>
																<FlagIcon htmlColor="blue" />
															</Button>
														) : (
															<Button onClick={() => handleUpdateRole(row.id, 2)}>
																<FlagIcon htmlColor="black" />
															</Button>
														)
													) : (
														<Button>
															<FlagIcon color="disabled" />
														</Button>
													)
												) : (
													value
												)
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

GroupMemberList.propTypes = {
	data: PropTypes.array,
	handleDeleteMember: PropTypes.func,
	handleUpdateRole: PropTypes.func,
};

GroupMemberList.defaultProps = {
	data: [],
	handleDeleteMember: () => { },
	handleUpdateRole: () => { },
}

export default GroupMemberList;