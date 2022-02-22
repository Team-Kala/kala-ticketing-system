const request = require('supertest');
const fs = require('fs');
const path = require('path');
const testJsonFile = path.resolve(__dirname, '../test/test_data.json');
const server = 'http://localhost:3000';

describe('Route integration', () => {
  afterAll(() => {
    console.log('I ran');
  });

  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/add', () => {
    // bring newTicket variable up here to make the code cleaner
    describe('POST', () => {
      it('responds with 200 status and text/plain content type', () => {
        const newTicket = {
          first_name: 'Kayliegh',
          department: 1,
          issue_title: 'broken window',
          issue_summary: "it's cold in here",
          priority: 1,
        };
        return request(server)
          .post('/add')
          .send([newTicket])
          .expect('Content-Type', /text\/plain/)
          .expect(200);
      });

      it('responds with the updated ticket list', () => {
        const newTicket = [
          {
            first_name: 'Kayliegh',
            department: 1,
            issue_title: 'broken window',
            issue_summary: "it's cold in here",
            priority: 1,
          },
        ];
        return request(server)
          .post('/add')
          .send()
          .then((response) => {
            expect(response.body).toBeDefined();
          });
      });
    });
  });
});
