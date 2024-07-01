const express = require("express");
const app = express();
const port = 3016;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
app.use(express.json());

const posts = [
  { name: "kalyan", age: 12 },
  { name: "arun", age: 162 },
  { name: "hari", age: 544 },
];

const users = [];

app.get("/post", (req, res) => {
  res.status(201).json(posts);
});

app.post("/login", async (req, res) => {
  try {
    let hashedpassword = await bcrypt.hash(req.body.password, 10);
    let user = { user: req.body.user, password: hashedpassword };
    users.push(user);

    res.status(201).json({ users });
  } catch {
    res.status(500).send("error from catch");
  }
});

app.post("/users/login", async (req, res) => {
  let data = users.find((user) => user.user === req.body.user);

  if (data == null) {
    res.status(401).json({ message: "there is no user" });
  }

  try {
    if (await bcrypt.compare(req.body.password, data.password)) {
      res.json({ messgae: "sucessful login" });
    } else {
      res.json({ message: "failed to login" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.listen(port, () => {
  console.log(`post is running in ${port}`);
});
