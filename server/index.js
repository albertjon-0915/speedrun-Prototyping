const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const userRoute = require("./routes/users");
const blogRoute = require("./routes/blogs");

const app = express();

const corsOptions = {
     origin: ["http://localhost:4000", "http://localhost:3000", "https://prototyping-api.onrender.com"],
     credentials: true,
     optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoute);
app.use("/blogs", blogRoute);

mongoose.connect(
     `${
          process.env.MONGOOSE_URL ||
          "mongodb+srv://admin:admin123@appbuildingapi1.xk4oims.mongodb.net/Prototyping?retryWrites=true&w=majority"
     }`
);

mongoose.connection.once("open", () => console.log("Connected to mongoDB Atlas"));

if (require.main === module) {
     app.listen(4000 || process.env.PORT, () => console.log(`Connected to port ${process.env.PORT || 4000}`));
}

module.exports = { app, mongoose };
