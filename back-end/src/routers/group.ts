import express from "express";
import { Group, GroupDocumentInterface } from "../models/group.js";

export const groupRouter = express.Router();

groupRouter.post("/groups", async (req, res) => {
  try {
    const group = new Group(req.body);
    await group.save();
    res.status(201).json({
      messagge: "Group successfuly created",
    });
  } catch (error) {
    res.status(406).json({ message: "Try another group", code: 0 });
  }
});

// READ (GET)
// groupRouter.get("/groups", async (req, res) => {
//   try {
//     const groups = await Group.find();
//     res.send(groups);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

groupRouter.get("/groups", async (req, res) => {
  try {
    const filter = req.query.id ? { id: req.query.id } : {};
    const groups = await Group.find(filter);

    if (groups && groups.length > 0) {
      let groupsInfo = groups.map((group) => ({
        id: group.id,
        admin: group.admin,
        group_name: group.group_name,
        genres: group.genres,
        members: group.members,
      }));

      return res
        .status(200)
        .send({ message: "List with groups", data: groupsInfo });
    } else {
      return res.status(404).send({ message: "No groups available" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server Error" });
  }
});

// UPDATE (PATCH)
groupRouter.patch("/groups/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "A id must be provided",
        code: 0,
      });
    }
    const id = req.params.id;
    const allowedUpdates = ["group_name", "genres", "members"];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.some((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res
        .status(400)
        .send({ message: "At least one valid field is required for update" });
    }
    const groups = await Group.find({ id: id });

    if (groups.length !== 0) {
      const updatedGroups: GroupDocumentInterface[] = [];

      for (let index = 0; index < groups.length; index++) {
        const groupToUpdate = groups[index];
        const updatedGroup = await Group.findByIdAndUpdate(
          groupToUpdate._id,
          { ...req.body },
          { new: true, runValidators: true }
        );

        if (updatedGroup) {
          updatedGroups.push(updatedGroup);
        }
      }

      return res.status(200).json({
        message: "Group successfully updated",
        updatedGroups,
      });
    }

    return res.status(404).send({
      message: "Group not found",
      code: 0,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE
groupRouter.delete("/groups/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "A id must be provided",
        code: 0,
      });
    }
    const groups = await Group.find({ id: req.params.id });
    if (groups.length !== 0) {
      for (let i = 0; i < groups.length; i++) {
        // Deletes an group
        const deletedGroup = await Group.findByIdAndDelete(groups[i]._id);
      }
      // Sends the result to the client
      return res.status(200).send({
        message: "Group deleted",
      });
    }
    return res.status(404).send({
      message: "Group not found",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
