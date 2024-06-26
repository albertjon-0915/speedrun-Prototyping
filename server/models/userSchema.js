const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     name: { type: "String", required: ["Name is require"] },
     email: { type: "String", required: ["Email is require"] },
     password: { type: "String", required: ["Password is require"] },
     isAdmin: { type: "Boolean", default: false },
});

module.exports = mongoose.model("User", userSchema);
