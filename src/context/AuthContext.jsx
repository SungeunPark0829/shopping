import { createContext, useContext, useEffect, useState } from "react";
import { logout, onUserChange, signInWithGoogle } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    onUserChange(setUser);
  }, []);

  return <AuthContext.Provider value={{user, uid : user && user.uid, signInWithGoogle, logout}}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
