import React from 'react';
import Layout from '../../../common/Layout/Layout';
import Form from './Form';

function Login() {
	const header = (
		<>
			Signin to your account
		</>
	);

	const midSection = <Form signIn />;

	return (
		<Layout heading={header} midSection={midSection} className="layout_card" />
	);
}

export default Login;
