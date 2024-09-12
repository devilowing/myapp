export const checkTokenExpiration = (token) => {
    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
    const currentTime = Date.now() / 1000; // Get current time in seconds

    return decodedToken.exp < currentTime;
};

export const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
};
