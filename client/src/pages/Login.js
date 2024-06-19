import { useContext, useEffect, useState } from "react";
import UserContext from "../userContext";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
     const { user, setUser } = useContext(UserContext);
     const [validated, setValidated] = useState(false);
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");

     const authenticate = (e) => {
          e.preventDefault();
          fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
               method: "POST",
               body: JSON.stringify({
                    email,
                    password,
               }),
               headers: {
                    "Content-type": "application/json",
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.access) {
                         localStorage.setItem("token", data.access);
                         retrieveUserDetails(data.access);
                    } else {
                         Swal.fire({
                              title: "Something went wrong",
                              text: data.message || data.error,
                         });
                    }
               });
     };

     const retrieveUserDetails = (token) => {
          fetch(`${process.env.REACT_APP_API_URL}/users/`, {
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data.result);
                    data
                         ? setUser({
                                id: data.result._id,
                                isAdmin: data.result.isAdmin,
                           })
                         : setUser({
                                id: null,
                                isAdmin: null,
                           });
               });
     };

     useEffect(() => {
          if (email !== "" || password !== "" || confirmPassword !== "") {
               setValidated(true);
          } else {
               setValidated(false);
          }
     }, [user, setUser, email, password, confirmPassword]);
     return user.id ? (
          <Navigate to={"/blogs"} />
     ) : (
          <Container fluid>
               <Form validated={validated} onSubmit={(e) => authenticate(e)} className="ms-md-5 mt-5">
                    <Row as={Col} md="4" className="flex-column pt-5">
                         <h1 className="pt-5 mt-5">Login</h1>
                         <Form.Group controlId="email" className="mt-2">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                   required
                                   className="minWidth"
                                   type="text"
                                   placeholder="Email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                              />
                              <Form.Control.Feedback></Form.Control.Feedback>
                         </Form.Group>
                         <Form.Group controlId="password">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                   required
                                   className="minWidth"
                                   type="password"
                                   placeholder="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                              />
                              <Form.Control.Feedback></Form.Control.Feedback>
                         </Form.Group>
                         <Form.Group controlId="confirmPassword">
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control
                                   required
                                   className="minWidth"
                                   type="password"
                                   placeholder="Confirm password"
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                              />
                              <Form.Control.Feedback></Form.Control.Feedback>
                              <Button type="submit" className="my-3">
                                   Login
                              </Button>
                         </Form.Group>
                    </Row>
               </Form>
          </Container>
     );
}
