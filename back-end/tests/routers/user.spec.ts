// user.test.ts

import { app } from "../../src/app.js";
import request from "supertest";
import { expect } from "chai";
import { User } from "../../src/models/user.js";

const defaultUser = {
  id: "saul",
  full_name: "Saul Martin",
  mail: "saul@gmail.com",
  birth_date: new Date("02/12/2002"),
  password: "1234",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(defaultUser).save();
});

describe("User Routes", () => {
  describe("POST /signup", () => {
    it("It should register a new user", async () => {
      await request(app).delete("");
      const response = await request(app).post("/signup").send({
        id: "testuser",
        full_name: "tesy",
        mail: "test@gmail.com",
        birth_date: "12/01/2020",
        password: "testpassword",
      });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("messagge", "sign up successful");
      expect(response.body).to.have.property("token");
      expect(response.body).to.have.property("code", 1);
    });

    it("It should handle registration errors", async () => {
      const response = await request(app).post("/signup").send({
        id: "saul",
        full_name: "aaa",
        mail: "test@gmail.com",
        birth_date: "12/01/2020",
        password: "1234",
      });

      expect(response.status).to.equal(406);
      expect(response.body).to.have.property(
        "message",
        "Try an other username"
      );
      expect(response.body).to.have.property("code", 0);
    });
  });

  describe("POST /login", () => {
    it("It should log in with valid credentials", async () => {
      const response = await request(app).post("/login").send({
        id: "saul",
        password: "1234",
      });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("message", "Login successful");
      expect(response.body).to.have.property("token");
      expect(response.body).to.have.property("user");
      expect(response.body.user).to.have.property("id", "saul");
    });

    it("It should throw an error if the password or username is not provided", async () => {
      const response = await request(app).post("/login").send({
        id: "saul",
      });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property(
        "message",
        "Need username and password"
      );
      expect(response.body).to.have.property("code", 0);
    });

    it("It should handle login errors with invalid credentials", async () => {
      const response = await request(app).post("/login").send({
        id: "testuser",
        password: "invalidpassword",
      });

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property(
        "message",
        "Invalid username or password"
      );
      expect(response.body).to.have.property("code", 0);
    });
  });

  describe("PATCH /users", () => {
    it("It should throw an error if an id is not provided", async () => {
      const response = await request(app)
        .patch("/users")
        .send({
          full_name: "Pepe",
          mail: "pepe@gmail.com",
          birth_date: new Date("1/1/2000"),
        });
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property(
        "message",
        "A id must be provided"
      );
      expect(response.body).to.have.property("code", 0);
    });
    it("It should throw an error if trying to update critical data", async () => {
      const response = await request(app)
        .patch("/users?id=saul")
        .send({
          password: "Pepe",
          mail: "pepe@gmail.com",
          birth_date: new Date("1/1/2000"),
        });
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("message", "Update not permited");
      expect(response.body).to.have.property("code", 0);
    });

    it("It should update data", async () => {
      const response = await request(app)
        .patch("/users?id=saul")
        .send({
          full_name: "Pepe",
          mail: "pepe@gmail.com",
          birth_date: new Date("1/1/2000"),
        });
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("users");
    });

    it("It should not give information if user does not exist", async () => {
      const response = await request(app)
        .patch("/users?id=pepe")
        .send({
          full_name: "Pepe",
          mail: "pepe@gmail.com",
          birth_date: new Date("1/1/2000"),
        });
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property("message", "User not found");
      expect(response.body).to.have.property("code", 0);
    });
  });
  describe("Delete /users", () => {
    it("It should throw an error if an id is not provided", async () => {
      const response = await request(app).delete("/users");
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property(
        "message",
        "A id must be provided"
      );
      expect(response.body).to.have.property("code", 0);
    });
    it("It should throw an error if an user not found", async () => {
      const response = await request(app).delete("/users?id=NONEXISTANUSER");
      expect(response.status).to.equal(404);
      expect(response.body).to.have.property(
        "message",
        "User not found, error in deleting"
      );
    });

    it("It should throw an error if an user not found", async () => {
      const response = await request(app).delete("/users?id=saul");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("message", "User deleted");
      await new User(defaultUser).save();
    });
  });
});
