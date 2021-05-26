import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));
	return user && user.token ? (
		<Route {...rest} render={() => children} />
	) : (
		<h1 className='text-danger'>Loading...</h1>
	);
};

export default UserRoute;

// function PrivateRoute({ children, ...rest }) {
// 	let auth = useAuth();
// 	return (
// 		<Route
// 			{...rest}
// 			render={({ location }) =>
// 				auth.user ? (
// 					children
// 				) : (
// 					<Redirect
// 						to={{
// 							pathname: '/login',
// 							state: { from: location }
// 						}}
// 					/>
// 				)
// 			}
// 		/>
// 	);
// }
