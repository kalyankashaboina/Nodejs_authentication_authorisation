const express = require("express");
const app = express();
const port = 3016;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());

const posts = [
  { name: "kalyan", age: 12 },
  { name: "arun", age: 162 },
  { name: "hari", age: 544 },
];

const users = [];

// Authenticate middleware
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json("Token not sent");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json("Token is not valid");
    }
    req.user = user;
    next();
  });
}




// Get posts endpoint
app.get("/post", authenticate, (req, res) => {
  res.json(posts.filter(post => post.name === req.user.user));
});

// User registration endpoint





app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { user: req.body.user, password: hashedPassword };
    users.push(user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});


// hit the port with this Object
// {
//   "user": "kalyan",
//   "password": "yourpassword"
// }





// User login endpoint
app.post("/login", async (req, res) => {
  const user = users.find(u => u.user === req.body.user);
  if (user == null) {
    return res.status(401).json({ message: "User not found" });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign({ user: user.user }, process.env.ACCESS_TOKEN);
      res.status(200).json({ accessToken });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error during login" });
  }
});



// hit login port with vereified user
// {
//   "user": "kalyan",
//   "password": "yourpassword"
// }

// u will get access token as reponse copy it for  further use
// use this acces token in header bearer
//  u will get object of that person





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
