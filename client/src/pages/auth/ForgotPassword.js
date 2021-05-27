import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ForgotPassword = ({ history }) => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState('');

  const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const config = {
			url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
			handleCodeInApp: true
		};

		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				setEmail('');
				toast.success('Check your email for Password reset link');
        setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				toast.error(error.message);
				setLoading(false);
			});
	};

	return (
		<div className='container col-md-6 offset-md-3 p-5'>
			<form onSubmit={handleSubmit}>
				{loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Forgot Password</h4>}
				<input
					type='email'
					value={email}
					className='form-control'
					autoFocus
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Please enter your email.'
				/>
				<br />
				<button type='submit' className='btn btn-raised' disabled={!email}>
					Reset Password
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
