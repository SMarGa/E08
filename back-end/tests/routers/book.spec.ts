import { app } from "../../src/app.js";
import request from "supertest";
import { expect } from "chai";
import { Book } from "../../src/models/book.js";

const defaultBook = {
  id: 1,
  description: "aaa",
  book_name: "1984",
  author: "George Orwell",
  genres: [" a ", " a "],
  release_year: 1949,
  editorial: "DEBOLSILLO",
  bookcover: "../src/assets/bookcovers/1984_bookcover.jpg",
};

beforeEach(async () => {
  await Book.deleteMany();
  await new Book(defaultBook).save();
});

describe("Book Routes", () => {
  describe("POST /books", () => {
    it("should register a new book", async () => {
      try {
        console.log("Deleting existing books...");
        await Book.findOneAndDelete(defaultBook);
        console.log("Existing books deleted.");
      } catch (error) {
        console.error("Error deleting existing books:", error);
      }
      const response = await request(app)
        .post("/books")
        .send({
          id: 2,
          description: "aaa",
          book_name: "Testbook",
          author: "tess test",
          genres: ["T"],
          release_year: 1943,
          editorial: "Test",
          bookcover: "../src/assets/bookcovers/A_bookcover.jpg",
        });
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property(
        "message",
        "Successfully added book"
      );
    });

    it("should handle registration errors(Unique fields)", async () => {
      const response = await request(app)
        .post("/books")
        .send({
          id: 1,
          description: "aaaa",
          book_name: "Testbook",
          author: "tess test",
          genres: ["L"],
          release_year: 1943,
          editorial: "Test",
          bookcover: "../src/assets/bookcovers/Alicia_bookcover.jpg",
        });

      expect(response.status).to.equal(406);
      expect(response.body).to.have.property("message", "Try another book");
      expect(response.body).to.have.property("code", 0);
    });
    it("should handle registration errors(All fields required)", async () => {
      const response = await request(app)
        .post("/books")
        .send({
          id: 13,
          description: "aaaa",
          book_name: "AA",
          author: "tess test",
          genres: ["L"],
          release_year: 1000,
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property(
        "message",
        "All are required fields"
      );
    });
  });

  describe("GET /books", () => {
    it("It should show books", async () => {
      const response = await request(app).get("/books");
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("message", "List with books");
    });

    it("It should show groups by id", async () => {
      const response = await request(app).get("/books/23");
      expect(response.status).to.equal(404);
    });
  });

  describe("PATCH /books", () => {
    it("should update a book", async () => {
      const response = await request(app)
        .patch("/books/1")
        .send({
          description: "Updated Description",
          genres: ["Updated Genre"],
        });
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        "message",
        "Book successfully updated"
      );
    });

    it("should handle errors when updating a book(No valid field)", async () => {
      // Attempt to update with invalid data or unauthorized user
      const response = await request(app).patch("/books/1").send({
        release_year: 2011,
      });

      expect(response.status).to.equal(400);
    });

    it("should handle not finding a book to update", async () => {
      const response = await request(app).patch("/books/1000").send({
        description: "Updated Description",
      });

      expect(response.status).to.equal(404);
    });
  });

  describe("DELETE /books/:id", () => {
    it("should delete a book", async () => {
      const response = await request(app).delete(`/books/1`);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        "message",
        "Book successfully deleted"
      );
    });

    it("should handle errors when deleting a book", async () => {
      const response = await request(app).delete("/books/1000");

      expect(response.status).to.equal(404);
    });
  });
});
