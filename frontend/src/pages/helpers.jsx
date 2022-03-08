//save login response (email & token) to local storage

export const authenticate = (res) => {
    localStorage.setItem('profileData', JSON.stringify(res));
}

//access user info from local storage

export const getUser = () => {
    if (localStorage.getItem('profileData')) {
        return JSON.parse(localStorage.getItem('profileData'));
    } else {
        return false;
    }
}


//remove token from local storage
export const logout = () => localStorage.removeItem('profileData');