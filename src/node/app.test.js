const supertest = require("supertest");
const { getApp } = require('./app');

test("GET /", async () => {
    const clientMock = {
        query: jest.fn().mockImplementation(async () => {
            return { rows: [] };
        }),
        connect: jest.fn().mockImplementation((callback) => callback()),
    }

    app = getApp(clientMock);

    await supertest(app).get("/")
        .expect(200)
        .then((response) => {
            // Check type and length
            expect(Array.isArray(response.body)).toBeTruthy();
        });
});

test("GET by id", async () => {
    const heroId = 123;
    const clientMock = {
        query: jest.fn().mockImplementation(async () => {
            return { rows: [{ Id: heroId }] };
        }),
        connect: jest.fn().mockImplementation((callback) => callback()),
    }

    app = getApp(clientMock);

    await supertest(app).get(`/${heroId}`)
        .expect(200)
        .then((response) => {
            expect(response.body).toStrictEqual({ id: heroId });
        });
});