import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';


const Register = () => {
	const [email, setEmail] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
    const config = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true
		};

    await auth
			.sendSignInLinkToEmail(email, config)
			.then(() => {
				console.log('Email Sent');
				toast.success(`Email sent to ${email}`);
				// Save user to localStorage
				window.localStorage.setItem('emailForRegistration', email);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, '\n', errorMessage);
				toast.error('Error sending link. Try again later');
			});
      // Clear email field
      setEmail('')
	};

  const registerForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				className='form-control'
				value={email}
				type='email'
				onChange={(e) => setEmail(e.target.value)}
				autoFocus
			/>
			<button type='submit' className='btn btn-raised'>
				Register
			</button>
		</form>
	);

	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Register</h4>

					{registerForm()}
				</div>
			</div>
		</div>
	);
};

export default Register;