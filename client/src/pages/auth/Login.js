import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth, googleAuthProvider } from '../../firebase';
import { toast } from 'react-toastify';
import { Button, Space, Spin } from 'antd';
import { GoogleOutlined, MailOutlined } from '@ant-design/icons';

const Login = ({ history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push('/');
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		// console.table('email :', email, '\n','password :', password)
		try {
			const result = await auth.signInWithEmailAndPassword(email, password);
			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();

			dispatch({
				type: 'LOGGED_IN_USER',
				payload: {
					email: user.email,
					token: idTokenResult.token
				}
			});
			history.push('/');
		} catch (error) {
			console.log(error.message);
			toast.error(error.message);
			setLoading(false);
		}
	};

	const googleLogin = async () => {
		auth
			.signInWithPopup(googleAuthProvider)
			.then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();
				// req to backend
				dispatch({
					type: 'LOGGED_IN_USER',
					payload: {
						email: user.email,
						token: idTokenResult.token
					}
				});
				history.push('/');
			})
			.catch((error) => {
				console.log(error);
				toast.error(error.message);
			});
	};

	const loginForm = () => (
		<form>
			<div className='form-group'>
				<input
					className='form-control'
					value={email}
					type='email'
					onChange={(e) => setEmail(e.target.value)}
					autoFocus
					placeholder='Your Email'
				/>
			</div>
			<div className='form-group'>
				<input
					className='form-control'
					value={password}
					type='password'
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Your Password'
				/>
			</div>
			<Button
				type='primary'
				// className='mb-3'
				block
				shape='round'
				icon={<MailOutlined />}
				disabled={!email || password.length < 6}
				size='large'
				onClick={handleSubmit}>
				Login with Email/Password
			</Button>
		</form>
	);

	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					{loading ? (
						<Space align='center'>
							<Spin size='large' />
						</Space>
					) : (
						<div>
							<h4>Login</h4>
							{loginForm()}
						</div>
					)}
					<Button
						type='danger'
						block
						shape='round'
						icon={<GoogleOutlined />}
						size='large'
						onClick={googleLogin}>
						Login with Google
					</Button>
					<Link to='/forgot/password' className='float-right text-danger'>
						Forgot pasword
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
