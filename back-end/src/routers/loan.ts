import express from "express";
import { Loan, LoanDocumentInterface } from "../models/loan.js";

export const loanRouter = express.Router();

loanRouter.post("/loans", async (req, res) => {
  try {
    const loan = new Loan(req.body);
    await loan.save();
    res.status(201).json({
      messagge: "Loan successfuly created",
    });
  } catch (error) {
    res.status(406).json({ message: "Try another loan", code: 0 });
  }
});

// READ (GET)
loanRouter.get("/loans", async (req, res) => {
  try {
    const filter = req.query.id ? { id: req.query.id } : {};
    const loans = await Loan.find(filter);

    if (loans && loans.length > 0) {
      let loansInfo = loans.map((loan) => ({
        id: loan.id,
        book_id: loan.book_id,
        user_id: loan.user_id,
        loan_date: loan.loan_date,
        return_date: loan.return_date,
      }));

      return res
        .status(200)
        .send({ message: "List with loans", data: loansInfo });
    } else {
      return res.status(404).send({ message: "No loans available" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server Error" });
  }
});

// UPDATE (PATCH)
loanRouter.patch("/loans/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "A id must be provided",
        code: 0,
      });
    }
    const id = req.params.id;
    const allowedUpdates = ["return_date"];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.some((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res
        .status(400)
        .send({ message: "At least one valid field is required for update" });
    }
    const loans = await Loan.find({ id: id });

    if (loans.length !== 0) {
      const updatedLoans: LoanDocumentInterface[] = [];

      for (let index = 0; index < loans.length; index++) {
        const loanToUpdate = loans[index];
        const updatedLoan = await Loan.findByIdAndUpdate(
          loanToUpdate._id,
          { ...req.body },
          { new: true, runValidators: true }
        );

        if (updatedLoan) {
          updatedLoans.push(updatedLoan);
        }
      }

      return res.status(200).json({
        message: "Loan successfully updated",
        updatedLoans,
      });
    }

    return res.status(404).send({
      message: "Loan not found",
      code: 0,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE
loanRouter.delete("/loans/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).send({
        message: "A id must be provided",
        code: 0,
      });
    }
    const loans = await Loan.find({ id: req.params.id });
    if (loans.length !== 0) {
      for (let i = 0; i < loans.length; i++) {
        // Deletes an loan
        const deletedLoan = await Loan.findByIdAndDelete(loans[i]._id);
      }
      // Sends the result to the client
      return res.status(200).send({
        message: "Loan deleted",
      });
    }
    return res.status(404).send({
      message: "Loan not found",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
