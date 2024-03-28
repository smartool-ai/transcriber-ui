import { createContext, useContext, useState } from 'react'

export const UserContext = createContext({
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
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{
      token: {
        setState: setToken,
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
