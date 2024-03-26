import { createContext, useContext, useState } from 'react'

export const UserContext = createContext({
  firstName: {
    setState: () => {},
    state: null,
  },
  fullName: {
    setState: () => {},
    state: null,
  },
});

export const UserContextProvider = ({ children }) => {
  const [firstName, setFirstName] = useState(null);
  const [fullName, setFullName] = useState(null);

  return (
    <UserContext.Provider value={{
      firstName: {
        setState: setFirstName,
        state: firstName,
      },
      fullName: {
        setState: setFullName,
        state: fullName,
      }
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);
