// BUILD YOUR SERVER HERE
const express = require("express");
const server = express();
const User = require("./users/model");

server.use(express.json());

server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      if (!users) {
        res.status(422).json({ message: "Users do not exist" });
      } else {
        res.status(200).json(users);
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(422).json({ message: "User does not exist" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

server.post("/api/users", (req, res) => {
  const payload = req.body;
  if (!payload.name || !payload.bio) {
    res.status(422).json("Name and bio required");
  } else {
    User.insert(payload)
      .then((newUser) => {
        if (!newUser) {
          res.status(422).json({ message: "Error Creating New User" });
        } else {
          res.status(201).json(newUser);
        }
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  }
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  if (!changes.name || !changes.bio) {
    res.status(422).json("Name and bio required");
  } else {
    User.update(id, changes)
      .then((changedUser) => {
        if (!changedUser) {
          res.status(422).json({ message: "Error Updating User" });
        } else {
          res.status(201).json(changedUser);
        }
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  User.remove(id)
    .then((removedUser) => {
      if (!removedUser) {
        res.status(422).json({ message: "Error Deleting User" });
      } else {
        res.status(201).json(removedUser);
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

server.use("*", (req, res) =>
  res.status(404).json({ message: "Page Not Found" })
);

module.exports = server; // EXPORT YOUR SERVER instead of {}
