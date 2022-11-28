import React from 'react';
import './signUp.scss';
import Layout from '../../../common/Layout/Layout';
import Form from '../Login/Form';

function SignUp() {
	// const { t } = useTranslation(['common']);

	const headerSection = <>Sign up</>;

	const midSection = <Form />;

	return (
		<div className="container">
			<div className="d-flex justify-content-center align-items-center p-5">
				<div className="card">
					<div className="card-body">
						<Layout heading={headerSection} midSection={midSection} signIn={false} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
