import { Document, Schema, model } from "mongoose";
import { BookDocumentInterface } from "./book.js";
import { UserDocumentInterface } from "./user.js";

export interface LoanDocumentInterface extends Document {
  id: number;
  book_id: BookDocumentInterface;
  user_id: UserDocumentInterface;
  loan_date: Date;
  return_date: Date;
}

const LoanSchema = new Schema<LoanDocumentInterface>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  book_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Book",
  },
  loan_date: {
    type: Date,
    default: getCurrentDate, // Utiliza la función para obtener la fecha actual
    validate: (value: Date) => {
      if (value > new Date()) {
        throw new Error("Future date not permitted");
      }
    },
  },
  return_date: {
    type: Date,
    default: () => getReturnDate(getCurrentDate()), // Utiliza la función para obtener la fecha tres meses después
    validate: (value: Date) => {
      if (value > new Date()) {
        throw new Error("Future date not permitted");
      }
    },
  },
});

// Función para obtener la fecha actual
function getCurrentDate(): Date {
  return new Date();
}

// Función para obtener la fecha tres meses después
function getReturnDate(loanDate: Date): Date {
  const returnDate = new Date(loanDate);
  returnDate.setMonth(returnDate.getMonth() + 3);
  return returnDate;
}

export const Loan = model<LoanDocumentInterface>("Loan", LoanSchema);
