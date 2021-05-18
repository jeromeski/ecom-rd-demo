import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const RegisterComplete = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		setEmail(window.localStorage.getItem('emailForRegistration'));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		//
	};

	const completeRegistrationForm = () => (
		<form onSubmit={handleSubmit}>
			<input className='form-control' value={email} type='email' disabled />
			<input
				className='form-control'
				value={password}
				type='password'
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
				autoFocus
			/>
			<br />
			<button type='submit' className='btn btn-raised'>
				Register
			</button>
		</form>
	);

	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Finish</h4>

					{completeRegistrationForm()}
				</div>
			</div>
		</div>
	);
};

export default RegisterComplete;
