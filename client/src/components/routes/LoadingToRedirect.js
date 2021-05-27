import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingToRedirect = () => {
	const history = useHistory();

	const [count, setCount] = useState(5);

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((c) => --c);
		}, 1000);
		count === 0 && history.push('/');
		return () => clearInterval(interval);
	}, [count, history]);

	return (
		<div className='container p-5 text-center'>
			<h1>{`Redirecting you in ${count}`}</h1>
		</div>
	);
};

export default LoadingToRedirect;
