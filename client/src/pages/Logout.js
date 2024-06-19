import { useContext, useEffect } from "react";
import UserContext from "../userContext";
import { Navigate } from "react-router-dom";

export default function Logout() {
     const { unsetUser, setUser } = useContext(UserContext);

     useEffect(() => {
          unsetUser();

          setUser({
               id: null,
               isAdmin: null,
          });
     }, []);

     return <Navigate to={"/login"} />;
}
