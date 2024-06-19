import { useContext, useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../userContext";

export default function AddComment({ Id, fetchBlogs }) {
     const { user } = useContext(UserContext);
     const [comment, setComment] = useState("");
     const [modalShow, setModalShow] = useState(false);

     console.log(comment);

     const addComment = () => {
          setModalShow(false);

          let token = localStorage.getItem("token");

          fetch(`${process.env.REACT_APP_API_URL}/blogs/addComment/${Id}`, {
               method: "PATCH",
               body: JSON.stringify({
                    userId: user.id,
                    comment: comment,
               }),
               headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    console.log(data);
                    if (data.message === "Failed to add comment" || data.error) {
                         Swal.fire({
                              title: "Something went wrong",
                              text: data.message || data.error,
                         });
                         fetchBlogs();
                    } else {
                         setComment("");

                         Swal.fire({
                              title: "Success",
                              text: "Commented on the blog",
                         });
                         fetchBlogs();
                    }
               });
     };

     return (
          <>
               <a className="ms-4" onClick={() => setModalShow(true)}>
                    Add comment
               </a>
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
                              <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                   <Form.Control
                                        as="textarea"
                                        placeholder="Enter comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        style={{ height: "100px" }}
                                   />
                              </FloatingLabel>
                         </Form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button onClick={addComment}>Comment</Button>
                         <Button onClick={() => setModalShow(false)}>Close</Button>
                    </Modal.Footer>
               </Modal>
          </>
     );
}
