import React from 'react';
import PropTypes from 'prop-types';

function Layout({ heading, midSection, className }) {
	console.log(className);
	const layout = (
		<div className="p-5">
			<div className="head_section pb-5 text-center">
				<h3><b>{heading}</b></h3>
			</div>
			<div className="mid_section">
				{midSection}
			</div>
		</div>
	);

	return (
		<div className={`layout ${className}`}>
			{layout}
		</div>
	);
}

Layout.propTypes = {
	className: PropTypes.string,
};

Layout.defaultProps = {
	className: '',
};

export default Layout;
