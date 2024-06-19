import { useContext, useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../userContext";

export default function AddNewBlog({ fetchBlogs }) {
     const [blog, setBlog] = useState("");
     const [modalShow, setModalShow] = useState(false);

     const addBlog = () => {
          setModalShow(false);

          let token = localStorage.getItem("token");

          fetch(`${process.env.REACT_APP_API_URL}/blogs/addBlog`, {
               method: "POST",
               body: JSON.stringify({
                    blog: blog,
               }),
               headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.message === "Successfully uploaded the blog") {
                         setBlog("");

                         Swal.fire({
                              title: "Success",
                              text: "Commented on the blog",
                         });
                         fetchBlogs();
                    } else {
                         Swal.fire({
                              title: "Something went wrong",
                              text: data.message || data.error,
                         });
                         fetchBlogs();
                    }
               });
     };

     return (
          <>
               <Button onClick={() => setModalShow(true)} className="m-md-5 m-2 px-5">
                    +Blog
               </Button>
               <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
               >
                    <Modal.Header closeButton>
                         <Modal.Title id="contained-modal-title-vcenter">Add comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form>
                              <FloatingLabel controlId="floatingTextarea2" label="blog">
                                   <Form.Control
                                        as="textarea"
                                        placeholder="Enter new blog"
                                        value={blog}
                                        onChange={(e) => setBlog(e.target.value)}
                                        style={{ height: "100px" }}
                                   />
                              </FloatingLabel>
                         </Form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button onClick={addBlog}>upload</Button>
                         <Button onClick={() => setModalShow(false)}>Close</Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}
