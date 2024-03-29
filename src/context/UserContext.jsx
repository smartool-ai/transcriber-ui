import { createContext, useContext, useState } from 'react'

export const UserContext = createContext({
  permissions: {
    setState: () => {},
    state: null,
  },
  token: {
    setState: () => {},
    state: null,
  },
  user: {
    setState: () => {},
    state: null,
  },
});

export const UserContextProvider = ({ children }) => {
  const [permissions, setPermissions] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleToken = (token) => {
    setPermissions(token.permissions);
    setToken(token);
  };

  return (
    <UserContext.Provider value={{
      permissions: {
        setState: setPermissions,
        state: permissions,
      },
      token: {
        setState: handleToken,
        state: token,
      },
      user: {
        setState: setUser,
        state: user,
      },
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);
