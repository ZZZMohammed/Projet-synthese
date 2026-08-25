import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const GoogleCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            localStorage.setItem('token', token);

            // Get the user information from Laravel
            fetch('http://localhost:8000/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to get profile');
                    }

                    return response.json();
                })
                .then(data => {
                    localStorage.setItem('user', JSON.stringify(data.user));

                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            token: token,
                            user: data.user
                        }
                    });

                    navigate('/');
                })
                .catch(error => {
                    console.error('Google authentication error:', error);
                    localStorage.removeItem('token');
                    navigate('/login');
                });
        } else {
            navigate('/login');
        }
    }, [searchParams, navigate, dispatch]);

    return (
        <div>
            <h2>Logging you in...</h2>
        </div>
    );
};

export default GoogleCallback;