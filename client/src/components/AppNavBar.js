import { useContext } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserContext from "../userContext";

export default function AppNavBar() {
     const { user } = useContext(UserContext);
     return (
          <Navbar expand="sm" className=" py-3 addBoxShadow fullWidth">
               <Container fluid>
                    <Navbar.Brand>BlogSpot</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
                    <Navbar.Offcanvas
                         id={`offcanvasNavbar-expand-sm`}
                         aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                         placement="end"
                    >
                         <Offcanvas.Header closeButton>
                              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>Menu</Offcanvas.Title>
                         </Offcanvas.Header>
                         <Offcanvas.Body>
                              <Nav className="justify-content-end flex-grow-1 pe-3">
                                   <Nav.Link as={Link} to={"/blogs"}>
                                        Blog
                                   </Nav.Link>
                                   {user.id ? (
                                        <Nav.Link as={Link} to={"/logout"}>
                                             Logout
                                        </Nav.Link>
                                   ) : (
                                        <>
                                             <Nav.Link as={Link} to={"/login"}>
                                                  Login
                                             </Nav.Link>
                                             <Nav.Link as={Link} to={"/register"}>
                                                  Register
                                             </Nav.Link>
                                        </>
                                   )}
                              </Nav>
                         </Offcanvas.Body>
                    </Navbar.Offcanvas>
               </Container>
          </Navbar>
     );
}
