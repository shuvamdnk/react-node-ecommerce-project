import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MoonLoader } from "react-spinners";
import { authSliceActions } from '../store/slices/auth-slice';

const Protected: React.FC = ({ component: Component, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const access_token = useSelector((state) => state.auth.access_token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [auth, setAuth] = useState<Boolean>();
    useEffect(() => {
        async function checkAuth() {
            if (isAuthenticated && access_token) {
                const local_access_token = localStorage.getItem('access_token');
                if (local_access_token === access_token) {
                    try {
                        const resp = await fetch(`${import.meta.env.VITE_NODE_API}/auth/verify`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${access_token}`
                            }
                        });
                        const data = await resp.json();
                        console.log(data);

                        if (data.status === 'success') {
                            setAuth(true);
                        } else {
                            dispatch(authSliceActions.userLogout())
                            navigate('/login');
                        }
                    } catch (error) {
                        dispatch(authSliceActions.userLogout())
                        navigate('/login');
                    }
                }else{
                    dispatch(authSliceActions.userLogout())
                    navigate('/login');
                }
            } else {
                dispatch(authSliceActions.userLogout())
                navigate('/login');
            }
        }
        checkAuth();
    }, [isAuthenticated, access_token])

    if (auth) {
        return <Component  {...rest} />
    } else {
        return <div className='loader_overlay'>
            <MoonLoader
                color={'#C86A83'}
                loading={auth}
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }
};

export default Protected;