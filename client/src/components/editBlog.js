import { useEffect, useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import Swal from "sweetalert2";
import Blogs from "../pages/Blogs";

export default function EditBlog({ Id, fetchBlogs }) {
     const [newBlog, setNewBlog] = useState("");
     const [blog, setBlog] = useState({});

     const [modalShow, setModalShow] = useState(false);

     const getBlog = () => {
          let token = localStorage.getItem("token");

          fetch(`${process.env.REACT_APP_API_URL}/blogs/getBlogs/${Id}`, {
               headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data) {
                         setBlog(data);
                    } else {
                         console.log(data.message || data.error);
                    }
               })
               .catch((error) => {
                    console.error("Error fetching blog:", error);
               });
     };

     const editBlog = () => {
          setModalShow(false);

          let token = localStorage.getItem("token");

          fetch(`${process.env.REACT_APP_API_URL}/blogs/updateBlog/${Id}`, {
               method: "PATCH",
               body: JSON.stringify({
                    blog: newBlog,
               }),
               headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.message === "Successfully updated") {
                         setNewBlog("");
                         Swal.fire({
                              title: "Success",
                              text: "Blog updated",
                              icon: "success",
                         });
                         fetchBlogs();
                    } else {
                         Swal.fire({
                              title: "Something went wrong",
                              text: data.message || data.error,
                              icon: "error",
                         });
                         fetchBlogs();
                    }
               })
               .catch((error) => {
                    console.error("Error updating blog:", error);
                    Swal.fire({
                         title: "Error",
                         text: "Failed to update blog",
                         icon: "error",
                    });
               });
     };

     useEffect(() => {
          getBlog();
     }, [blog, newBlog]);

     return (
          <>
               <a className="ms-4" onClick={() => setModalShow(true)}>
                    Edit
               </a>
               <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
               >
                    <Modal.Header closeButton>
                         <Modal.Title id="contained-modal-title-vcenter">Editing Blog ID: {blog._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form>
                              <FloatingLabel controlId="floatingTextarea2" label="Update Blog">
                                   <Form.Control
                                        as="textarea"
                                        placeholder="Enter blog content"
                                        defaultValue={blog.blog}
                                        onChange={(e) => setNewBlog(e.target.value)}
                                        style={{ height: "100px" }}
                                   />
                              </FloatingLabel>
                         </Form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button onClick={editBlog}>Update</Button>
                         <Button onClick={() => setModalShow(false)}>Close</Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}
