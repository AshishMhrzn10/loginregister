const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

mongoose.connect("mongodb+srv://ashish:1234@cluster0.9vzot.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB connection successful"))
    .catch(err => console.log(err));

//Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const User = new mongoose.model("User", userSchema);


app.use(express.json());
app.use(cors());
//Routes
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        !user && res.send({ message: "User not registered!" });

        if (user.password === password) {
            res.status(200).send({ message: "Login Successful", user: user });
        } else {
            res.send({ message: "Wrong password or username!" });
        }
    } catch (err) {
        res.send({ message: "User not found" });
    }
});

app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const oldUser = await User.findOne({ email: email });
        oldUser && res.send({ message: "Username already exists!" });

        const newUser = new User({
            name,
            email,
            password
        });
        const user = await newUser.save();
        res.send({ message: "User successfully created." });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(8800, () => {
    console.log("Backend server is running");
});