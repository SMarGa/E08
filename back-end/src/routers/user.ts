import express from "express";
import { User, UserDocumentInterface } from "../models/user.js";

export const userRouter = express.Router();
import * as jose from "jose";
import jwt from "jsonwebtoken";

// Register a user
userRouter.post("/signup", async (req, res) => {
  try {
    // Adds the user to the database
    const user = new User({
      ...req.body,
    });
    await user.save();

    const token = jwt.sign({ id: user.id }, "1234", {
      expiresIn: "1h",
    });

    return res.status(201).json({
      messagge: "sign up successful",
      token: token,
      user: user,
      code: 1,
    });
  } catch (error) {
    return res
      .status(406)
      .json({ message: "Try an other username", code: 0, error: error });
  }
});

// Log in
userRouter.post("/login", async (req, res) => {
  try {
    const userName = req.body.id;
    const password = req.body.password;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Need username and password", code: 0 });
    }

    const user = await User.findOne({ id: userName });

    // Sends the result to the client
    if (user && user.password == password) {
      // User authenticated, generate JWT token
      const token = jwt.sign({ id: user.id }, "1234", {
        expiresIn: "1h",
      });

      return res
        .status(200)
        .json({ message: "Login successful", code: 1, token, user });
    }

    return res
      .status(401)
      .json({ message: "Invalid username or password", code: 0 });
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Updates users by id
userRouter.patch("/users", async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).send({
        message: "A id must be provided",
        code: 0,
      });
    }
    // Checks if update is allowed
    const allowedUpdates = ["full_name", "mail", "birth_date"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdate) {
      return res.status(400).send({
        message: "Update not permited",
        code: 0,
      });
    }

    // Checks if elements from body exist and get previous info

    // Finds the users by name
    const users = await User.find({ id: req.query.id.toString() });
    if (users.length !== 0) {
      const updatedUsers: UserDocumentInterface[] = [];
      for (let index = 0; index < users.length; index++) {
        // Updates an user
        const userToUpdate = users[index];
        const updatedUser = await User.findByIdAndUpdate(
          userToUpdate._id,
          {
            ...req.body,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // Sends the result to the client
      return res.status(201).send({ users: updatedUsers });
    }
    return res.status(404).send({
      message: "User not found",
      code: 0,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Deletes users by name NOT IMPLEMENTED JUST A TEMPLATE
userRouter.delete("/users", async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(400).send({
        message: "A id must be provided",
        code: 0,
      });
    }

    // Finds the users by id
    const users = await User.find({ id: req.query.id.toString() });
    if (users.length !== 0) {
      for (let i = 0; i < users.length; i++) {
        // Deletes an user
        const deletedUser = await User.findByIdAndDelete(users[i]._id);
      }
      // Sends the result to the client
      return res.status(200).send({
        message: "User deleted",
      });
    }
    return res.status(404).send({
      message: "User not found, error in deleting",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
