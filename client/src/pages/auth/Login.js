import React, { useState } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const Login = () => {
	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
    console.table('email :', email, '\n','password :', password)
		// 
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
      className='mb-3' 
      block
      shape='round'
      icon={<MailOutlined/>}
      disabled={!email || password.length < 6}
      size='large' 
      onClick={handleSubmit}>Login with Email/Password</Button>
		</form>
	);

	return (
		<div className='container p-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3'>
					<h4>Login</h4>
					{loginForm()}
				</div>
			</div>
		</div>
	);
};

export default Login;
