/* eslint-disable no-underscore-dangle */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
	root: {},

	left: {
		padding: '10px',
		width: '185px',
	},

	right: {},

	link: {
		'text-decoration': 'none',
		color: 'black',
	},
}));

function Group({ group, handleDeleteGroup }) {
	const classes = useStyles();

	return (
		<Box
			sx={{
				borderRadius: 2,
				overflow: 'hidden',
				backgroundColor: 'white',
				boxShadow: `rgba(0, 0, 0, 0.2) 0px 5px 10px`,
			}}
		>
			<Box padding={2} sx={{ backgroundColor: '#26a69a' }}>
				<Box display="flex" flexDirection="row" alignItems="center">
					<Box>
						<Typography
							noWrap
							sx={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}
						>
							{group.group_id.name}
						</Typography>
						<Typography
							noWrap
							sx={{
								color: 'white',
								fontSize: 14,
								fontWeight: 600,
							}}
						>
							{group.group_id.owner_name}
						</Typography>
					</Box>
					<Box ml="auto">
						<DeleteIcon
							style={{
								color: 'white',
								cursor: 'pointer',
								fontSize: 20,
							}}
							onClick={() => handleDeleteGroup(group.group_id._id)}
						/>
					</Box>
				</Box>
			</Box>
			<Link to={group.group_id._id} className={classes.link}>
				<Box padding={1}>
					<Box>
						<img
							src="https://i.imgur.com/lGzYT1g.jpg"
							alt={group.group_id.name}
							width="100%"
							style={{
								borderRadius: 2,
							}}
						/>
					</Box>
				</Box>
			</Link>
		</Box>
	);
}

Group.propTypes = {
	group: PropTypes.object,
	handleDeleteGroup: PropTypes.func,
};

Group.defaultProps = {
	group: {},
	handleDeleteGroup: () => {},
};

export default Group;
