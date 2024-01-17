import { app } from "../../src/app.js";
import request from "supertest";
import { expect } from "chai";
import { Comment } from "../../src/models/comment.js";
import { User } from "../../src/models/user.js";
import { Book } from "../../src/models/book.js";

const defaultBook = {
  id: 0,
  description: "aaa",
  book_name: "tesito",
  author: "Test",
  genres: [" a ", " a "],
  release_year: 1949,
  editorial: "DEBOLSILLO",
  bookcover: "../src/assets/bookcovers/test_bookcover.jpg",
};

const defaultUser = {
  id: "testo",
  full_name: "Testo Martin",
  mail: "testo@gmail.com",
  birth_date: new Date("02/12/2002"),
  password: "1234",
};

const defaultComment = {
  book_referenced: defaultBook.id,
  author: defaultUser.id,
  comment: "Test",
};

beforeEach(async () => {
  await Comment.deleteMany();
  await new Comment(defaultComment).save();
});

describe("Comment Routes", () => {
  describe("POST /comments", () => {
    it("should register a new comment", async () => {
      await request(app).delete("");
      const response = await request(app).post("/comments").send({
        book_referenced: defaultBook.id,
        author: "Samu",
        comment: "Test",
      });
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property(
        "message",
        "Successfully added comment"
      );
    });

    it("should handle errors (existing comment)", async () => {
      await request(app).delete("");
      const response = await request(app).post("/comments").send({
        book_referenced: defaultBook.id,
        author: defaultUser.id,
        comment: "Test",
      });
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property(
        "message",
        "Comment ID already exists"
      );
    });
  });

  describe("GET /comments/:book_referenced", () => {
    it("It should show comments about some book", async () => {
      const response = await request(app).get("/comments/0");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("message", "List with comments");
    });

    it("It should handle errors (comments by book_referenced)", async () => {
      const response = await request(app).get("/comments/12");
      expect(response.status).to.equal(404);
    });
  });

  describe("DELETE /comments/:id", () => {
    it("should delete a comment", async () => {
      const response = await request(app).delete("/comments/testo");

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        "message",
        "Comment successfully deleted"
      );
    });

    it("should handle errors when deleting a comment", async () => {
      const response = await request(app).delete("/comments/1000");

      expect(response.status).to.equal(404);
    });
  });
});
