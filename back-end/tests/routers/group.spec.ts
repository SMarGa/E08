import { app } from "../../src/app.js";
import request from "supertest";
import { expect } from "chai";
import { User } from "../../src/models/user.js";
import { Group } from "../../src/models/group.js";

const defaultUser = {
  id: "test",
  full_name: "Test Martin",
  mail: "test@gmail.com",
  birth_date: new Date("02/12/2002"),
  password: "1234",
};

const defaultUser1 = {
  id: "taquito",
  full_name: "Taco Martin",
  mail: "taq@gmail.com",
  birth_date: new Date("02/12/2002"),
  password: "taquito",
};

const defaultGroup = {
  id: 0,
  admin: new User(defaultUser),
  group_name: "Los diablos",
  genre: ["Amor"],
  members: [new User(defaultUser), new User(defaultUser1)],
};

beforeEach(async () => {
  await Group.deleteMany();
  await new Group(defaultGroup).save();
});

describe("Group Routes", () => {
  describe("POST /groups", () => {
    it("It should register a new group", async () => {
      await request(app).delete("");
      const response = await request(app)
        .post("/groups")
        .send({
          id: 1,
          admin: new User(defaultUser),
          group_name: "Mantecao",
          genre: ["Amor de verano"],
          members: [new User(defaultUser), new User(defaultUser1)],
        });

      expect(response.status).to.equal(201);
      expect(response.body).to.have.property(
        "messagge",
        "Group successfuly created"
      );
    });

    it("It should handle registration errors", async () => {
      const response = await request(app)
        .post("/groups")
        .send({
          id: 0,
          admin: new User(defaultUser),
          group_name: "Los diablos",
          genre: ["Amor"],
          members: [new User(defaultUser), new User(defaultUser1)],
        });
      expect(response.status).to.equal(406);
      expect(response.body).to.have.property("message", "Try another group");
    });
  });

  describe("GET /groups", () => {
    it("It should show groups", async () => {
      const response = await request(app).get("/groups");
      //expect(response.body[0].group_name).to.equal(defaultGroup.group_name);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("message", "List with groups");
    });

    it("It should show groups by id", async () => {
      const response = await request(app).get("/groups/23");
      expect(response.status).to.equal(404);
    });
  });

  describe("PATCH /groups", () => {
    it("It should throw an error if trying to update critical data", async () => {
      const response = await request(app)
        .patch("/groups/0")
        .send({
          admin: new User(defaultUser1),
        });
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property(
        "message",
        "At least one valid field is required for update"
      );
    });
    it("It should update data", async () => {
      const response = await request(app)
        .patch("/groups/0")
        .send({
          group_name: "Mantecao",
          genre: ["Amor de verano"],
        });
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property(
        "message",
        "Group successfully updated"
      );
    });
    it("It should not give information if group does not exist", async () => {
      const response = await request(app)
        .patch("/groups/3")
        .send({
          group_name: "Mantecao",
          genre: ["Amor de verano"],
        });
      expect(response.status).to.equal(404);
    });
  });

  describe("Delete /groups", () => {
    it("It should throw an error if an group not found", async () => {
      const response = await request(app).delete("/groups/8");
      expect(response.status).to.equal(404);
    });

    it("It should delete a group", async () => {
      const response = await request(app).delete("/groups/0");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("message", "Group deleted");
    });
  });
});
