import { createContext, useState } from "react";


export const AuthContext = createContext();



export function AuthProvider({ children }) {


  const [user, setUser] = useState(
    localStorage.getItem("username")
  );


  const [token, setToken] = useState(
    localStorage.getItem("token")
  );



  const login = (username, authToken) => {


    localStorage.setItem(
      "token",
      authToken
    );


    localStorage.setItem(
      "username",
      username
    );


    setUser(username);

    setToken(authToken);

  };




  const logout = () => {


    localStorage.removeItem("token");

    localStorage.removeItem("username");


    setUser(null);

    setToken(null);

  };




  return (

    <AuthContext.Provider

      value={{
        user,
        token,
        login,
        logout
      }}

    >

      {children}

    </AuthContext.Provider>

  );

}