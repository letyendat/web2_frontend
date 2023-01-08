/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import PresentationInfo from '../components/PresentationInfo';

function DetailPresentationPage({ socket }) {
	return (
		<div
			style={{
				padding: `0 16px`,
				'&::WebkitScrollbar': { width: 0, height: 0 }
			}}
		>
			<PresentationInfo socket={socket} />
		</div>
	);
}

DetailPresentationPage.propTypes = {
	socket: PropTypes.object,
};

export default DetailPresentationPage;
