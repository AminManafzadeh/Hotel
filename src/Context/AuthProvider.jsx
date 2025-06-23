import { createContext, useReducer } from "react";

const initialState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "login": {
      return { isAuthenticated: true, user: action.payload };
    }

    case "logout": {
      return { isAuthenticated: false, user: null };
    }

    default:
      throw new Error("Unknown action !!");
  }
}

export const AuthContext = createContext();

const FAKE_USER = {
  name: "amin",
  email: "amin.mah1375@gmail.com",
  password: "123456",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
