const bcrypt = require("bcrypt");
const User = require("../models/userSchema");

const { errorHandler, createAccessToken } = require("../auth");

module.exports.Register = (req, res) => {
     const { name, email, password } = req.body;

     if (!name) {
          return res.send({ message: "Name is required" });
     } else if (!email || !email.includes("@")) {
          return res.send({ message: "Invalid email" });
     } else if (!password || password.length < 8) {
          return res.send({ message: "Invalid password" });
     }

     User.findOne({ email: email })
          .then((result) => {
               if (result) {
                    return res.status(400).send({ message: "Email already exist" });
               }

               const newUser = new User({
                    name,
                    email,
                    password: bcrypt.hashSync(password, 10),
               });

               newUser.save().then((result) => {
                    if (!result) {
                         return res.status(400).send({ message: "Cannot register, please try again" });
                    }

                    return res.status(201).send({ message: "Registered successfully" });
               });
          })

          .catch((err) => errorHandler(err, req, res));
};

module.exports.Login = (req, res) => {
     const { email, password } = req.body;
     if (!email || !password || !email.includes("@")) {
          return res.status(400).send({ message: "Cannot Login, please check credentials" });
     }

     User.findOne({ email: email })
          .then((result) => {
               if (!result) {
                    return res.status(404).send({ message: "No emails found" });
               }

               let isPasswordCorrect = bcrypt.compareSync(password, result.password);

               return isPasswordCorrect
                    ? res.status(200).send({ access: createAccessToken(result) })
                    : res.status(401).send({ message: "Incorrect email or password" });
          })
          .catch((err) => errorHandler(err, req, res));
};

module.exports.Details = (req, res) => {
     User.findById({ _id: req.user.id })
          .then((result) => {
               if (!result) {
                    return res.status(404).send({ message: "No users found" });
               }

               return res.status(200).send({ message: "Found user", result });
          })
          .catch((err) => errorHandler(err, req, res));
};
