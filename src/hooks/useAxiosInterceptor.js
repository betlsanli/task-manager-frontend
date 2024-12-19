import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const useAxiosInterceptor = (onLogout, loggedIn) => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response, // Pass successful response through
      error => {
        if (error.response && error.response.status === 401) {
          // Session expired or unauthorized response
          localStorage.removeItem('token'); // Clear token from localStorage
          localStorage.removeItem('user');
          onLogout();
          navigate('/login'); // Redirect to login page
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Cleanup interceptor on component unmount
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate, onLogout, loggedIn]);
};

export default useAxiosInterceptor;
