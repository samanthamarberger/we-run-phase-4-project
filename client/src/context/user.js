
import React, { useState, useEffect } from 'react';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch('/me')
        .then(r => r.json())
        .then(user => {
            setUser(user)
        })
    }, [])

    const login = () => {

    }

    const logout = () => {
        setUser(null)
    }

    const signup = () => {
        setUser(user)
    }

    return (
        <UserContext.Provider value={{user, login, logout, signup}}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };

