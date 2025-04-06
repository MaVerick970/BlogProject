const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(comments[req.params.id] || []);
});
app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  let commentArray = comments[req.params.id] || [];
  commentArray.push({ id: commentId, comment: content });

  comments[req.params.id] = commentArray;

  res.status(201).send(comments);
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
