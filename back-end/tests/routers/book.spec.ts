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
  bookcover: "../../front-end/src/assets/bookcovers/1984_bookcover.jpg",
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
      const response = await request(app).post("/books").send({
        id: 2,
        description: "aaa",
        book_name: "Testbook",
        author: "tess test",
        genres: ["T"],
        release_year: 1943,
        editorial: "Test",
        bookcover: "../../front-end/src/assets/bookcovers/Alicia_bookcover.jpg",
      });

      console.log("Response:", response.body); // Log the entire response for more details

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("message", "Successfully added book");
    });

    it("should handle registration errors", async () => {
      await request(app).delete(`/books?id=${defaultBook.id}`);
      const response = await request(app).post("/books").send({
        id: 1,
        description: "aaaa",
        book_name: "Testbook",
        author: "tess test",
        genres: ["L"],
        release_year: 1943,
        editorial: "Test",
        bookcover: "../../front-end/src/assets/bookcovers/Alicia_bookcover.jpg",
      });

      expect(response.status).to.equal(406);
      expect(response.body).to.have.property("message", "Try another book");
      expect(response.body).to.have.property("code", 0);
    });
  });

  describe("PATCH /books", () => {
    // it("should update a book", async () => {
    // console.log("ID del libro a actualizar:", defaultBook.id);
    //   const response = await request(app)
    //     .patch(`/books?id=${defaultBook.id}`)
    //     .send({
    //       description: "Updated Description",
    //       genres: ["Updated Genre"]
    //     });

    //   expect(response.status).to.equal(200);
    //   expect(response.body).to.have.property("message", "Book successfully updated");
    //   expect(response.body).to.have.property("updatedBook");
    // });

    it("should handle errors when updating a book", async () => {
      // Attempt to update with invalid data or unauthorized user
      const response = await request(app)
        .patch(`/books/${2}`)
        .send({
          release_year: 2011,
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("message", "At least one valid field is required for update");
    });

    it("should handle not finding a book to update", async () => {
      const response = await request(app)
        .patch("/books?id=10000")
        .send({
          description: "Updated Description",
        });

      expect(response.status).to.equal(404);
    });
  });

  // describe("DELETE /books/:id", () => {
  //   it("should delete a book", async () => {
  //     const response = await request(app).delete(`/books?id=${defaultBook.id}`);

  //     expect(response.status).to.equal(200);
  //     expect(response.body).to.have.property("message", "Book successfully deleted");
  //     expect(response.body).to.have.property("deletedBook");
  //   });

  //   it("should handle errors when deleting a book", async () => {
  //     // Attempt to delete with an invalid ID or unauthorized user
  //     const response = await request(app).delete("/books?id=0");

  //     expect(response.status).to.equal(404);
  //     expect(response.body).to.have.property("message", "Book not found");
  //   });
  // });
});