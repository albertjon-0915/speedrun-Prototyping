import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";
import { UserProvider } from "./userContext";

import Error from "./pages/Error";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Blogs from "./pages/Blogs";
import AppNavBar from "./components/AppNavBar";

function App() {
     const [user, setUser] = useState("");

     const unsetUser = () => {
          localStorage.clear();
     };

     console.log('token this', localStorage.getItem("token"));

     useEffect(() => {
          fetch(`${process.env.REACT_APP_API_URL}/users/`, {
               method: "GET",
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("token")}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);

                    typeof data === undefined
                         ? setUser({
                                id: data.result._id,
                                isAdmin: data.result.isAdmin,
                           })
                         : setUser({
                                id: null,
                                isAdmin: null,
                           });
               });
     }, []);

     return (
          <UserProvider value={{ user, setUser, unsetUser }}>
               <Router>
                    <AppNavBar />
                    <Routes>
                         <Route path="/register" element={<Register />} />
                         <Route path="/login" element={<Login />} />
                         <Route path="/logout" element={<Logout />} />
                         <Route path="/blogs" element={<Blogs />} />
                         <Route path="*" element={<Error />} />
                    </Routes>
               </Router>
          </UserProvider>
     );
}

export default App;
