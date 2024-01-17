import { Document, Schema, model } from "mongoose";
import { BookDocumentInterface } from "./book.js";
import { UserDocumentInterface } from "./user.js";

export interface CommentDocumentInterface extends Document {
  book_referenced: BookDocumentInterface["id"];
  author: UserDocumentInterface["id"];
  comment: string;
}

const CommentSchema = new Schema<CommentDocumentInterface>({
  book_referenced: {
    type: Number,
    required: true,
    ref: "Book",
  },
  author: {
    type: String,
    required: true,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
    validate: (content: string) => {
      if (content.length > 300) {
        throw new Error("Comment must be lower than 300 chars");
      }
    },
  },
});


export const Comment = model<CommentDocumentInterface>(
  "Comment",
  CommentSchema
);
