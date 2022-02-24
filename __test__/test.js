// needed to use async in this test file
import 'regenerator-runtime/runtime';

const request = require('supertest');
const fs = require('fs');
const path = require('path');
const testJsonFile = path.resolve(__dirname, '../__test__/test_data_testfile.json');
const server = 'http://localhost:3000';

describe('Route integration', () => {
  afterAll(() => {
    // server.quit();
    console.log('I ran');
  });

  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', async () => {
        return await request(server)
          .get('/')
          .set('Content-Type', 'text/html')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/api/add', () => {
    // bring newTicket variable up here to make the code cleaner
    const newTicket = {
      first_name: 'Nehreen',
      department: 1,
      issue_title: 'i wish i had time to do something outside of codesmith',
      issue_summary: 'there\'s a life outside of codesmith???',
      priority: 1,
    };

    describe('POST', () => {
      // database tests are asynchronous so we need to use async await functionality in tests
      // however to use async await we need to make sure we use 'regenerator-runtime/runtime' in webpack
      // as well as install 
      it('responds with 200 status and text/plain content type', async () => {
        return await request(server)
          .post('/api/add')
          // .set('Accept', 'application/json')
          .send([newTicket])
          .expect('Content-Type', 'application/json; charset=utf-8')
          .expect(200);
      });

      it('responds with the updated ticket list', async () => {
        return await request(server)
          .post('/api/add')
          .send()
          .then((response) => {
            expect(response.body).toBeDefined();
          });
      });
    });

    describe('DELETE', () => {
      it('responds with 404 status', async () => {
        const response = await request(server)
          .del('/remove')
          .expect('Content-Type', 'text/plain; charset=utf-8')
          // response.status is undefined
          .then((response) => {
            // console.log('hey girl hey: ', response);
            expect(response.status).toBe(404)
          })
          // .catch(err => console.error(err.message));
        })
      });
    });
  });
