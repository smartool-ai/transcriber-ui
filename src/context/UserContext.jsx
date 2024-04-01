import { createContext, useContext, useState } from 'react'

export const UserContext = createContext({
  setUser: () => {},
  user: null,
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{
      setUser,
      user,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);
