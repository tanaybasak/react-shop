import React from 'react';
import './signUp.scss';
import Layout from '../../../common/components/Layout';
import Form from '../Login/Form';

function SignUp() {
	const headerSection = <>Sign up</>;

	const midSection = <Form />;

	return (
		<div className="d-flex justify-content-center align-items-center vh-100">
			<div className="card">
				<Layout heading={headerSection} midSection={midSection} signIn={false} className="layout_card" />
			</div>
		</div>
	);
}

export default SignUp;
