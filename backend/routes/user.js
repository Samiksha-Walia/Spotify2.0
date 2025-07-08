const express = require("express");
const User = require("../Models/User");
const { generateToken } = require("../helper/generateToken");

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log(req.body);

  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      user = await User.findOne({ email: username });
    }

    if (!user) {
      return res.json({ success: false, message: "Invalid Credentials" });
    } else {
      if (user.password !== password)
        return res.json({ success: false, message: "Invalid Credentials" });
      else {
            let token = await generateToken(user._id);
              console.log(token, user);
      
              return res.json({
                success: true,
                token,
                user,
                message: "login successful",
              });
            }
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});
{/*
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { email,username, password, DOB, gender } = req.body;

  if (!email || !username || !password || !DOB || !gender)
    return res.json({ success: false, message: "All fields are required" });
  try {
    const user = await User.create({
      email,
      username,
      password,
      DOB,
      gender,
    });

    console.log(user);
    if (user) {
        let token = await generateToken(user._id);
        console.log(token);
        res.json({ success: true, message: "User Created" });
    } else {
      res.json({ success: false, message: "Some error creating Account" });
    }
  } catch (error) {
    //console.log(error);
    //res.json({ success: false, message: "internal server error" });
    console.error("❌ Error creating user:", error);
  res.json({ success: false, message: error.message });
  }
});
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json({ users,success: true, message: "users found" });
});

*/}

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { email, username, password, DOB, gender } = req.body;

  if (!email || !username || !password || !DOB || !gender)
    return res.json({ success: false, message: "All fields are required" });

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const user = await User.create({
      email,
      username,
      password,
      DOB: new Date(DOB), // ensure it's a Date object
      gender,
    });

    if (user) {
      let token = await generateToken(user._id);
      console.log(token);
      res.json({ success: true, message: "User Created", token });
    } else {
      res.json({ success: false, message: "Some error creating Account" });
    }
  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.json({ success: false, message: error.message }); // show actual error
  }
});
module.exports = router;