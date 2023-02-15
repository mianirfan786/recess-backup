import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { Backdrop, CircularProgress } from "@mui/material";
import { isRouteProtected, ROUTES } from "../routes";

const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("loading");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      if (user === "loading") {
        setTimeout(() => {
          setUser(currentuser);
        }, 500);
      } else {
        setUser(currentuser);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const isProtectedRoute = isRouteProtected(location.pathname);

    if (isProtectedRoute && !user) {
      navigate(ROUTES.LOGIN);
    }

    if (!isProtectedRoute && user && user !== "loading") {
      navigate(ROUTES.HOME);
    }
  }, [user, location.pathname]);

  if (user === "loading") {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={user === "loading"}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <UserAuthContext.Provider value={{ user }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
