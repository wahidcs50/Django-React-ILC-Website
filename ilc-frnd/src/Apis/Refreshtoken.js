import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useRefreshToken = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshToken, setRefreshToken] = useState(Cookies.get('refresh_token'));

  const refreshAccessToken = async () => {
    setIsRefreshing(true);

    try {
      const refreshTokenData = { refresh: refreshToken };
      const refreshResponse = await axios.post('http://localhost:8000/auth/jwt/refresh/', refreshTokenData);
      setRefreshToken(refreshResponse.data.access);
      Cookies.set('access_token', refreshResponse.data.access); // Update cookie as well
      setIsRefreshing(false);
      return refreshResponse.data.access; // Return the new access token
    } catch (error) {
      console.error('Error refreshing token:', error);
      setIsRefreshing(false);
      throw error; // Re-throw the error for handling in the component
    }
  };

  return { isRefreshing, refreshAccessToken };
};

export default useRefreshToken;

