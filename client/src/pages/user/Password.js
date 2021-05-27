import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';

const Password = () => {
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		await auth.currentUser
			.updatePassword(password)
			.then(() => {
				toast.success('You have successfully updated your password');
				setLoading(false);
				setPassword('');
			})
			.catch((err) => {
				console.log(err.message);
				toast.error('An error occured, please try again later');
				setLoading(false);
				setPassword('');
			});
	};

	const passwordUpdateForm = () => (
		<form onSubmit={handleSubmit}>
			<div className='form-group'>
				<label className='text-muted' htmlFor='pwordInput'>
					<small>New Password</small>
				</label>
				<input
					type='password'
					value={password}
					id='pwordInput'
					className='form-control'
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Enter new password'
					disabled={loading}
				/>
				<button className='btn btn-primary' type='submit' disabled={!password || loading}>
					Change Password
				</button>
			</div>
		</form>
	);

	return (
		<div className='container-fluid'>
			<div className='row'>
				<div className='col-md-2'>
					<UserNav />
				</div>
				<div className='col-md-10'>
					{loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Password Update</h4>}
					{passwordUpdateForm()}
				</div>
			</div>
		</div>
	);
};

export default Password;
