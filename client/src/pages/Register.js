import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
     const navigate = useNavigate();
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const register = (e) => {
          e.preventDefault();
          fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
               method: "POST",
               body: JSON.stringify({
                    name,
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
                    if (data.message === "Registered successfully") {
                         Swal.fire({
                              icon: "success",
                              title: "Successfully Registered",
                              text: data.message,
                         });
                         navigate("/login");
                    } else {
                         Swal.fire({
                              title: "Something went wrong",
                              text: data.message || data.error,
                         });
                    }
               });
     };

     return (
          <Container fluid>
               <Form onSubmit={(e) => register(e)} className="ms-md-5 mt-5">
                    <Row as={Col} md="4" className="flex-column pt-5">
                         <h1 className="pt-5 mt-5">Register</h1>
                         <Form.Group controlId="name" className="mt-2">
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                   required
                                   className="minWidth"
                                   type="text"
                                   placeholder="name"
                                   value={name}
                                   onChange={(e) => setName(e.target.value)}
                              />
                         </Form.Group>
                         <Form.Group controlId="email">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                   required
                                   className="minWidth"
                                   type="email"
                                   placeholder="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                              />
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
                              <Button type="submit" className="my-3">
                                   Register
                              </Button>
                         </Form.Group>
                    </Row>
               </Form>
          </Container>
     );
}
