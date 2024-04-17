const express = require("express");
const router = express.Router();

let users = [
  {
    id: 1,
    name: "First User",
    email: "firstUser@gmail.com",
  },
]; // Example data (you would typically use a database)

// Create operation - POST
router.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res
      .status(404)
      .json({ message: "Required details are not provided" });
  }
  const newUser = {
    id: users.length + 1,
    name: name,
    email: email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Read operation - GET
router.get("/users", (req, res) => {
  res.status(200).json(users);
});
// get req to read spcfic user data
router.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  res.status(200).json(users);
});

// Update operation - PUT
router.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = name || user.name;
  user.email = email || user.email;

  res.status(200).json(user);
});

// Delete operation - DELETE
router.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users.splice(index, 1);
  // res.sendStatus(204)
  res.json("deleted item successfully");
});

module.exports = router;
