import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import auth from '../../../authentication/firebase';

function Form({ signIn }) {
	const [username, setUserName] = useState(null);
	const [userPassword, setPassword] = useState(null);
	const { t } = useTranslation(['common']);
	const navigate = useNavigate();

	const handleLogin = (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((response) => {
				// eslint-disable-next-line no-underscore-dangle
				sessionStorage.setItem('Auth Token', response._tokenResponse.idToken);
				navigate('/products');
				// eslint-disable-next-line no-underscore-dangle
			}).catch((error) => new Error(error));
	};

	const handleSignUp = (email, password) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				// Signed in
				// const {user} = userCredential;
				navigate('/');
				// ...
			})
			.catch((error) => new Error(error));
	};

	return (
		<form>
			<div className="form-group">
				<label htmlFor="exampleInputEmail1">{t('email')}</label>
				<input type="email" className="form-control" onChange={(e) => setUserName(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
				<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
			</div>
			<div className="form-group">
				<label htmlFor="exampleInputPassword1">{t('password')}</label>
				<input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" placeholder="Password" />
			</div>
			<button
				className="btn btn-dark btn-block mt-4"
				onClick={() => (signIn
					? handleLogin(username, userPassword) : handleSignUp(username, userPassword))}
				type="button"
			>
				{signIn ? 'LOGIN' : 'SIGN UP'}
			</button>
		</form>
	);
}

export default Form;
