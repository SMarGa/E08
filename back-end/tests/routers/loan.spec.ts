import { app } from "../../src/app.js";
import request from "supertest";
import { expect } from "chai";
import { User } from "../../src/models/user.js";
import { Book } from "../../src/models/book.js";
import { Loan } from "../../src/models/loan.js";

const defaultUser = {
  id: "test",
  full_name: "Test Martin",
  mail: "test@gmail.com",
  birth_date: new Date("02/12/2002"),
  password: "1234",
};

const defaultBook = {
  id: 10,
  description: "aaa",
  book_name: "tesit",
  author: "Test",
  genres: [" a ", " a "],
  release_year: 1949,
  editorial: "DEBOLSILLO",
  bookcover: "../src/assets/bookcovers/testi_bookcover.jpg",
};

const defaultLoan = {
  id: 0,
  book_id: defaultBook.id,
  user_id: defaultUser.id,
};

beforeEach(async () => {
  await Loan.deleteMany();
  await new Loan(defaultLoan).save();
});

describe("Loan Routes", () => {
  describe("POST /loans", () => {
    it("It should register a new loan", async () => {
      await request(app).delete("");
      const response = await request(app).post("/loans").send({
        id: 1,
        book_id: defaultBook.id,
        user_id: defaultUser.id,
      });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property(
        "messagge",
        "Loan successfuly created"
      );
    });

    it("It should handle registration errors", async () => {
      const response = await request(app).post("/loans").send({
        id: 0,
        book_id: defaultBook.id,
        user_id: defaultUser.id,
      });
      expect(response.status).to.equal(406);
      expect(response.body).to.have.property("message", "Try another loan");
    });
  });

  describe("GET /loans", () => {
    it("It should show loans", async () => {
      const response = await request(app).get("/loans");

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("message", "List with loans");
    });

    it("It should show loans by id", async () => {
      const response = await request(app).get("/loans/23");
      expect(response.status).to.equal(404);
    });
  });

  describe("PATCH /loans", () => {
    it("It should throw an error if trying to update critical data", async () => {
      const response = await request(app).patch("/loans/0").send({
        book_id: defaultBook.id,
      });
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property(
        "message",
        "At least one valid field is required for update"
      );
    });
    it("It should update data", async () => {
      const response = await request(app)
        .patch("/loans/0")
        .send({
          return_date: new Date("03/03/2024"),
        });
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        "message",
        "Loan successfully updated"
      );
    });
    it("It should not give information if loan does not exist", async () => {
      const response = await request(app)
        .patch("/loans/3")
        .send({
          return_date: new Date("03/03/2024"),
        });
      expect(response.status).to.equal(404);
    });
  });

  describe("Delete /loans", () => {
    it("It should throw an error if an loan not found", async () => {
      const response = await request(app).delete("/loans/8");
      expect(response.status).to.equal(404);
    });

    it("It should delete a loan", async () => {
      const response = await request(app).delete("/loans/0");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("message", "Loan deleted");
    });
  });
});
