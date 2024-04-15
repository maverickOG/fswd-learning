const express = require("express");
const router = express.Router();

let items = []; // Example data (you would typically use a database)

// Create operation - POST
router.post("/items", (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Read operation - GET
router.get("/items", (req, res) => {
  res.json(items);
});

// Update operation - PUT
router.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  items[itemId] = updatedItem;
  res.json(updatedItem);
});

// Delete operation - DELETE
router.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  items.splice(itemId, 1);
  res.sendStatus(204);
});

module.exports = router;
