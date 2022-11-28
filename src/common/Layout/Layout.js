import React from 'react';

function Layout({ heading, midSection }) {
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
		<div className="layout">
			{layout}
		</div>
	);
}

export default Layout;
