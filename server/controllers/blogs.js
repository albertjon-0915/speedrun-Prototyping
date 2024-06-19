const Blogs = require("../models/blogsSchema");

const { errorHandler } = require("../auth");

module.exports.getBlogs = (req, res) => {
     Blogs.find({})
          .then((result) => {
               if (!result) {
                    return res.status(404).send({ message: "No blogs found" });
               }

               return res.status(200).send(result);
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.getBlogDetail = (req, res) => {
     Blogs.findById({ _id: req.params.blogId })
          .then((result) => {
               if (!result) {
                    return res.status(404).send({ message: "No blogs found" });
               }
               return res.status(200).send(result);
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.addBlog = (req, res) => {
     const { blog } = req.body;

     let newBlog = new Blogs({
          userId: req.user.id,
          blog,
          comments: [],
     });

     newBlog
          .save()
          .then((result) => {
               if (!result) {
                    return res.status(400).send({ message: "Failed to upload blog" });
               }
               return res.status(200).send({ message: "Successfully uploaded the blog", blog });
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.deleteBlog = (req, res) => {
     Blogs.findByIdAndDelete({ _id: req.params.blogId })
          .then((result) => {
               if (!result) {
                    return res.status(400).send({ message: "Failed to delete blog" });
               }
               return res.status(200).send({ message: "Successfully deleted the blog" });
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.updateBlog = (req, res) => {
     Blogs.findOneAndUpdate({ _id: req.params.blogId }, { $set: { blog: req.body.blog } })
          .then((result) => {
               if (!result) {
                    return res.status(400).send({ message: "Failed to update" });
               }
               return res.status(200).send({ message: "Successfully updated" });
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.addComment = (req, res) => {
     let newComment = {
          userId: req.user.id,
          comment: req.body.comment,
     };

     Blogs.findOneAndUpdate({ _id: req.params.blogId }, { $push: { comments: newComment } })
          .then((result) => {
               if (!result) {
                    return res.status(400).send({ message: "Failed to add comment" });
               }
               return res.status(200).send({ message: "Successfully commented on blog" });
          })
          .catch((err) => errorHandler(err, req, res));
};
