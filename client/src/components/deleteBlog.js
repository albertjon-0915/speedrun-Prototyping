import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function DeleteBlog({ fetchBlogs, Id }) {
     const deleteBlog = () => {
          let token = localStorage.getItem("token");
          fetch(`${process.env.REACT_APP_API_URL}/blogs/deleteBlog/${Id}`, {
               method: "DELETE",
               headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${token}`,
               },
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.message === "Successfully deleted the blog") {
                         Swal.fire({
                              title: "Deleted",
                              text: data.message,
                         });
                         fetchBlogs();
                    } else {
                         Swal.fire({
                              title: "Cannot perform action",
                              text: data.message || data.error,
                         });
                    }
               });
     };

     return <Button onClick={deleteBlog}>delete</Button>;
}
