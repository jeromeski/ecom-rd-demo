import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import {useDispatch} from 'react-redux';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterComplete from './pages/auth/RegisterComplete';

import { auth } from './firebase';

const App = () => {

  const dispatch = useDispatch();

	useEffect(() => {
		// onAuthStateChanged is an observer that gives us user
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				// json webtoken
				const idTokenResult = await user.getIdTokenResult();
				// console.log('user -->',  user);
				dispatch({
					type: 'LOGGED_IN_USER',
					payload: {
						email: user.email,
						token: idTokenResult.token
					}
				});
			}
		});
		// Cleanup
		return () => unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<React.Fragment>
			<Header />
			<ToastContainer autoClose={5000} hideProgressBar={false} />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/register/complete' component={RegisterComplete} />
			</Switch>
		</React.Fragment>
	);
};

export default App;
