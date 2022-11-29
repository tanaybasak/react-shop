import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../../../common/Layout/Layout';
import Form from './Form';

function Login() {
	const { t } = useTranslation(['common']);

	const header = (
		<>
			{t('signIn')}
		</>
	);

	const midSection = <Form signIn />;

	return (
		<Layout heading={header} midSection={midSection} className="layout_card" />
	);
}

export default Login;
