import PropTypes from "prop-types";
import { createContext, useEffect, useReducer } from "react";
// utils
import axios from "../utils/axios";
import { isValidToken, setSession } from "../utils/jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  roles: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user, roles } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      roles,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    roles: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  VALIDATE: (state, action) => {
    const { user, roles } = action.payload;
    return {
      ...state,
      user,
      roles,
    };
  },
  REFRESH: (state, action) => {
    const { user, roles } = action.payload;
    return {
      ...state,
      user,
      roles,
    };
  },
};
const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  validate: () => Promise.resolve(),
  refresh: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get("/Users/logged");
          const { user } = response.data;

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("/Security/login", {
      email,
      password,
    });
    const { accessToken, user, roles } = response.data;

    setSession(accessToken);

    dispatch({
      type: "LOGIN",
      payload: {
        user,
        roles,
      },
    });
  };

  const register = async (
    email,
    password,
    name,
    lastname,
    address,
    city,
    state,
    telephone,
    zip,
    placeId
  ) => {
    const response = await axios.post("/Security/register", {
      email,
      password,
      name,
      lastname,
      address,
      city,
      state,
      telephone,
      zip,
      placeId,
    });
    const { accessToken, user } = response.data;

    await AsyncStorage.setItem("accessToken", accessToken);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const refresh = async () => {
    const response = await axios.get("/Security/refresh");
    const { accessToken, user, roles } = response.data;

    dispatch({
      type: "REFRESH",
      payload: { user, roles },
    });
  };

  const validate = async () => {
    const response = await axios.get("/Security/validation");
    const { accessToken, user, roles } = response.data;

    dispatch({
      type: "VALIDATE",
      payload: {
        user,
        roles,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
        validate,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
