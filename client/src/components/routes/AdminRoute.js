import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';

const AdminRoute = ({ component: Component, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if(user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log('Current Admin Res', res);
          setIsAdmin(true)
        })
        .catch((err) => {
          console.log('Admin Route Err', err.message);
          setIsAdmin(false)
        })
    } 
  },[user])

	return isAdmin ? <Route {...rest} component={Component} /> : <LoadingToRedirect />;
};

export default AdminRoute;
