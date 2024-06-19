import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Card, Container, Button } from "react-bootstrap";
import UserContext from "../userContext";
import AddComment from "../components/addComment";
import DeleteBlog from "../components/deleteBlog";
import AddBlog from "../components/addBlog";
import EditBlog from "../components/editBlog";

export default function Blogs() {
     const { user } = useContext(UserContext);
     const [blogs, setBlogs] = useState([]);
     const token = localStorage.getItem("token");

     useEffect(() => {
          fetchBlogs();
     }, []);

     const fetchBlogs = () => {
          fetch(`${process.env.REACT_APP_API_URL}/blogs/getBlogs`, {
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data) {
                         setBlogs(data);
                    }
               })
               .catch((error) => {
                    console.error("Error fetching blogs:", error);
               });
     };

     return (
          <Container fluid className="p-0">
               {user.isAdmin ? null : <AddBlog fetchBlogs={fetchBlogs} />}
               <div className="windowSized py-5">
                    <Row id="rowBlogCard" className="d-flex justify-content-center">
                         <Col md="6" className="px-0">
                              {blogs.length > 0 ? (
                                   blogs.map((item) => (
                                        <Card
                                             className="border-0 border-bottom border-dark-subtle rounded-0"
                                             key={item._id}
                                        >
                                             <Card.Body>
                                                  <div className="d-sm-flex justify-content-sm-between mb-2">
                                                       <Card.Title>{item.userId}</Card.Title>
                                                       {user.isAdmin ? (
                                                            <DeleteBlog Id={item._id} fetchBlogs={fetchBlogs} />
                                                       ) : null}
                                                  </div>

                                                  <Card.Text className="ms-4">{item.blog}</Card.Text>

                                                  {item.userId === user.id ? (
                                                       <EditBlog fetchBlogs={fetchBlogs} Id={item._id} />
                                                  ) : null}
                                                  <Card.Subtitle className="fs-5 mt-4 mb-1 text-muted">
                                                       Comments:
                                                  </Card.Subtitle>

                                                  <AddComment Id={item._id} fetchBlogs={fetchBlogs} />

                                                  {item.comments.map((comment, index) => (
                                                       <div key={index}>
                                                            <Card.Subtitle className="ms-4 my-3 mb-0">
                                                                 {comment.userId}
                                                            </Card.Subtitle>
                                                            <Card.Text className="ms-5">{comment.comment}</Card.Text>
                                                       </div>
                                                  ))}
                                             </Card.Body>
                                        </Card>
                                   ))
                              ) : (
                                   <p>Waiting for blogs...</p>
                              )}
                         </Col>
                    </Row>
               </div>
          </Container>
     );
}
