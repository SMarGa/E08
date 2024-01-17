import { Document, Schema, model } from "mongoose";

export interface BookDocumentInterface extends Document {
  id: number;
  description: string;
  book_name: string;
  author: string;
  genres: string[];
  release_year: number;
  editorial: string;
  bookcover: string;
}

const BookSchema = new Schema<BookDocumentInterface>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (value.length > 1000) {
        throw new Error("Description is too long");
      }
    },
  },
  book_name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genres: {
    type: [String],
    required: true,
    trim: true,
  },
  release_year: {
    type: Number,
    required: true,
    validate: (value: number) => {
      const currentYear = new Date().getFullYear();
      if (value > currentYear) {
        throw new Error("Future year not permitted");
      }
    },
  },
  editorial: {
    type: String,
    required: true,
    trim: true,
  },
  bookcover: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: (value: string) => {
      if (!/.*\.(jpe?g)$/.test(value)) {
        throw new Error("Not a valid route");
      }
    },
  },
});

export const Book = model<BookDocumentInterface>("Book", BookSchema);
