import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterComplete from './pages/auth/RegisterComplete';


const App = () => {
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
