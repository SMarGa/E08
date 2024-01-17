import express from "express";
import "./db/mongoose.js";
import cors from "cors";
import { userRouter } from "./routers/user.js";
import { bookRouter } from "./routers/book.js";
import { groupRouter } from "./routers/group.js";
import { commentRouter } from "./routers/comment.js";
import { loanRouter } from "./routers/loan.js";

export const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(bookRouter);
app.use(groupRouter);
app.use(commentRouter);
app.use(loanRouter);
