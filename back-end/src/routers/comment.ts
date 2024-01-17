import express from "express";
import { Comment } from "../models/comment.js";

export const commentRouter = express.Router();

commentRouter.post("/comments", async (req, res) => {
  try {
    const newcomment = new Comment(req.body);
    await newcomment.save();
    return res
      .status(201)
      .send({ message: "Successfully added comment", newcomment });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Comment ID already exists", error: error });
  }
});

// READ (GET)
commentRouter.get("/comments/:book_id", async (req, res) => {
  try {
    const bookId = req.params.book_id;

    // Looks for comments with referenced book's id
    const comments = await Comment.find({
      book_referenced: bookId,
    });
    if (!comments || comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for the specified book." });
    }

    // Maps comments to specified format
    const comments_info = comments.map((comment) => ({
      author: comment.author,
      comment: comment.comment,
    }));
    //console.log("Received GET request for /comments/:book_referenced");
    // Returns comments founded with a status 200
    res
      .status(200)
      .json({ message: "List with comments", data: comments_info });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

commentRouter.delete("/comments/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "A id must be provided",
        code: 0,
      });
    }
    const comments = await Comment.find({ author: req.params.id });
    if (comments.length !== 0) {
      for (let i = 0; i < comments.length; i++) {
        // Deletes an book
        const deletedComment = await Comment.findByIdAndDelete(comments[i]._id);
      }
      // Sends the result to the client
      return res.status(200).send({
        message: "Comment successfully deleted",
      });
    }
    return res.status(404).send({ message: "Comment not found" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
});
