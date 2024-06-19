const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
     userId: { type: "String", required: [true, "userId is required"] },
     blog: { type: "String", required: [true, "Blog is required"] },
     comments: [
          {
               userId: { type: "String", required: [true, "userId is required"] },
               comment: { type: "String" },
               date: { type: "Date", default: Date.now },
          },
     ],
});

module.exports = mongoose.model("Blog", blogSchema);
