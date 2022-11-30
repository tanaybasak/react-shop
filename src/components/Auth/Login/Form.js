import React, { useContext, useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../authentication/firebase';
import { ShopContext } from '../../../common/shopContext';

function Form({ signIn }) {
	const [username, setUserName] = useState('');
	const [userPassword, setPassword] = useState('');
	const { updateToastInfo } = useContext(ShopContext);
	const navigate = useNavigate();

	const handleLogin = (email, password) => {
		setUserName('');
		setPassword('');
		signInWithEmailAndPassword(auth, email, password)
			.then((response) => {
				// eslint-disable-next-line no-underscore-dangle
				sessionStorage.setItem('Auth Token', response._tokenResponse.idToken);
				updateToastInfo({ title: 'Login Successfull ', message: 'Welcome to Expo!!', showToast: true });
				setTimeout(() => navigate('/products'), 2000);

				// eslint-disable-next-line no-underscore-dangle
			}).catch((error) => {
				const { message } = error;
				updateToastInfo({ title: 'Login Unsuccessfull ', message, showToast: true });
			});
	};

	const handleSignUp = (email, password) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				updateToastInfo({ title: 'Account Creation Successfull ', message: 'Welcome to Expo!!', showToast: true });
				setTimeout(() => navigate('/'), 2000);
				// ...
			})
			.catch((error) => new Error(error));
	};

	return (
		<form>
			<div className="form-group">
				<label htmlFor="exampleInputEmail1"> Email</label>
				<input type="email" value={username} className="form-control" onChange={(e) => setUserName(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
				<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
			</div>
			<div className="form-group">
				<label htmlFor="exampleInputPassword1">Password</label>
				<input type="password" value={userPassword} className="form-control" onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1" placeholder="Password" />
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
