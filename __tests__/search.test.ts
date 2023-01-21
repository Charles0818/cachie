// /During the test the env variable is set to test
import request from 'supertest';
import { expect, beforeAll, afterAll } from '@jest/globals';
import app from '../src/app';

describe("Post and retrieve cached words", () => {
    beforeAll(done => {
        done();
    })
      
    afterAll(done => {
        done()
    })

    describe('POST /v1/search', () => {
         it("should return 200", async () => {
            const searchToken = "The quick brown fox jumps over the lazy dog"
            const response = await request(app).post(`/v1/search?search_query=${searchToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe("ok");
          });

         it("should throw 400 bad request", async () => {
            const response = await request(app).post(`/v1/search`);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBeDefined();
          });
    });

    describe('GET /analyse', () => {
        it("should return number of occurrences for every analysis token", async () => {
            const analysisToken = 'the quick,the';
            const response = await request(app).get(`/v1/analyse?analysis_token=${analysisToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe("ok");
            expect(response.body.results).toBeDefined();
        console.log(response.body)
         });

         it("should throw 400 bad request", async () => {
            const response = await request(app).get(`/v1/analyse?analysis_token`);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBeDefined();
          });
    });
  
});
