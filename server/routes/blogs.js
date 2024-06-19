const express = require("express");
const router = express.Router();

const Blogs = require("../controllers/blogs");

const { verify, verifyAdmin } = require("../auth");

router.get("/getBlogs", verify, Blogs.getBlogs);
router.get("/getBlogs/:blogId", verify, Blogs.getBlogDetail);
router.post("/addBlog", verify, Blogs.addBlog);
router.patch("/updateBlog/:blogId", verify, Blogs.updateBlog);
router.patch("/addComment/:blogId", verify, Blogs.addComment);
router.delete("/deleteBlog/:blogId", verify, verifyAdmin, Blogs.deleteBlog);

module.exports = router;
