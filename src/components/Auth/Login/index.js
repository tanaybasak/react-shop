import React from 'react';
import Layout from '../../../common/components/Layout';
import Form from './Form';

function Login() {
	const header = (
		<>
			Sign-in to your account
		</>
	);

	const midSection = <Form signIn />;

	return (
		<Layout heading={header} midSection={midSection} className="layout_card" />
	);
}

export default Login;
