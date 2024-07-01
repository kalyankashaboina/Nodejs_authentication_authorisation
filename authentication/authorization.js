const express = require("express");
const app = express();
const { users, ROLE } = require("./datas");
const { authUser, authRole } = require("../Authorization/basicAuth");

app.use(express.json());

// Middleware to set user from request body
function setUser(req, res, next) {
    const userId = req.body.userId;
    if (userId) {
        req.user = users.find(user => user.id === userId);
    }
    next();
}

app.use(setUser);

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/dashboard", authUser, (req, res) => {
    res.send("Dashboard");
});

//  to get into dashboard page you nened to be
// send data like this
//  {
//     "userId": 1
//   }
// if u send empty object {} the u get error



app.get("/admin", authUser, authRole(ROLE.ADMIN), (req, res) => {
    res.send("Admin Page");
});



// send this in  body 
// {
//   "userId": 1
// }
// based on role it will grant permisson t admin page



app.listen(4000, () => {
    console.log("Server running on port 4000");
});
