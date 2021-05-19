import React, { useState } from 'react';
import { Menu } from 'antd';
import {
	AppstoreOutlined,
	SettingOutlined,
	UserAddOutlined,
	UserOutlined,
	LogoutOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Header = () => {
	const [current, setCurrent] = useState('home');

	const { SubMenu, Item } = Menu;

  const dispatch = useDispatch();
	const history = useHistory();

	const handleClick = (e) => {
		setCurrent(e.key);
	};

  const logout = () => {
		// Logout user from firebase
		auth.signOut();
		// remove user from state
		dispatch({
			type: 'LOGOUT',
			payload: null
		});
		history.push('/login');
	};


	return (
		<Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
			<Item key='home' icon={<AppstoreOutlined />}>
				<Link to='/'>Home</Link>
			</Item>
			<Item key='register' icon={<UserAddOutlined />} className='float-right'>
				<Link to='/register'>Register</Link>
			</Item>
			<Item key='login' icon={<UserOutlined />} className='float-right'>
				<Link to='/login'>Login</Link>
			</Item>

			<SubMenu icon={<SettingOutlined />} title='Username'>
				<Item key='option 1'>Option 1</Item>
				<Item key='option 2'>Option 2</Item>
				<Item icon={<LogoutOutlined />} onClick={logout}>
					Logout
				</Item>
			</SubMenu>
		</Menu>
	);
};

export default Header;
