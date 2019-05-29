import chai, { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, before, it } from 'mocha';
import app from '../app';

chai.use(chaiHttp);

describe('Test for create order endpoint', () => {
  it('Should create an order', (done) => {
    chai
      .request(app)
      .post('/api/v1/order')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        carId: '1200034',
        price: '1450000',
        priceOffered: '1380000',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.car_id).to.be.a('number');
        expect(res.body.data.created_on).to.be.a('string');
        expect(res.body.data.status).to.be.a('string');
        expect(res.body.data.price).to.be.a('number');
        expect(res.body.data.priceOffered).to.be.a('number');
        assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
        assert.strictEqual(res.body.status, 201, 'Status is not 201');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isNumber(res.body.data.car_id, 'ID is not a number');
        assert.isString(res.body.data.created_on, 'Date is not a string');
        assert.isString(res.body.data.status, 'Status is not a string');
        assert.isNumber(res.body.data.price, 'Price is not a number');
        assert.isNumber(res.body.data.priceOffered, 'Price is not a number');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error if request is not authorized', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
      })
      .send({
        carId: '1200034',
        price: '1450000',
        priceOffered: '1380000',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Authentication failed! Please Login again');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
        assert.strictEqual(res.body.status, 401, 'Status is not 401');
        assert.strictEqual(res.body.error,
          'Authentication failed! Please Login again',
          'Expect error to be Authentication failed! Please Login again');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error if token is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRyMWN2ZFhDQ0s1bldaa2oycmQ0NlZlRUpTeEd6SmNOcG9CaWp5RXhYTFRGLm1oeC4uZXdIZSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTEyODA4LCJleHAiOjE1NTg5MjM2MDh9.ZS813EEUegCYU3suHV1NwunqEZ4RvRzaKyoJ96iwl6E',
      })
      .send({
        carId: '1200034',
        price: '1450000',
        priceOffered: '1380000',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Authentication failed! Please Login again');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
        assert.strictEqual(res.body.status, 401, 'Status is not 401');
        assert.strictEqual(res.body.error,
          'Authentication failed! Please Login again',
          'Expect error to be Authentication failed! Please Login again');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });
});

describe('Test for update order price', () => {
  // Create an order
  let order;
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/order')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({
        carId: '1200034',
        price: '1450000',
        priceOffered: '1380000',
      })
      .end((err, res) => {
        order = res.body.data;
        done();
      });
  });

  it('Should update price of purchase order', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/order/${order.id}/price`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
      })
      .send({ newPriceOffered: '1580000' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.be.equal(200);
        expect(res.body.data.id).to.be.a('number');
        expect(res.body.data.car_id).to.be.a('number');
        expect(res.body.data.status).to.be.a('string');
        expect(res.body.data.old_price_offered).to.be.a('number');
        expect(res.body.data.new_price_offered).to.be.a('number');
        assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
        assert.strictEqual(res.body.status, 200, 'Status is not 200');
        assert.isObject(res.body, 'Response is not an object');
        assert.isObject(res.body.data, 'Data is not an object');
        assert.isNumber(res.body.data.id, 'ID is not a number');
        assert.isNumber(res.body.data.car_id, 'ID is not a number');
        assert.isNumber(res.body.data.old_price_offered, 'Price is not a number');
        assert.isNumber(res.body.data.new_price_offered, 'Price is not a number');
        assert.isString(res.body.data.status, 'Status is not a string');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error if request is not authorized', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/order/${order.id}/price`)
      .set({
        'Content-Type': 'application/json',
      })
      .send({ newPriceOffered: '1580000' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Authentication failed! Please Login again');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
        assert.strictEqual(res.body.status, 401, 'Status is not 401');
        assert.strictEqual(res.body.error,
          'Authentication failed! Please Login again',
          'Expect error to be Authentication failed! Please Login again');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });

  it('Should return an error if token is not valid', (done) => {
    chai
      .request(app)
      .patch(`/api/v1/order/${order.id}/price`)
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRyMWN2ZFhDQ0s1bldaa2oycmQ0NlZlRUpTeEd6SmNOcG9CaWp5RXhYTFRGLm1oeC4uZXdIZSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTEyODA4LCJleHAiOjE1NTg5MjM2MDh9.ZS813EEUegCYU3suHV1NwunqEZ4RvRzaKyoJ96iwl6E',
      })
      .send({ newPriceOffered: '1580000' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(401);
        expect(res.body.error).to.equal('Authentication failed! Please Login again');
        assert.isObject(res.body, 'Response is not an object');
        assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
        assert.strictEqual(res.body.status, 401, 'Status is not 401');
        assert.strictEqual(res.body.error,
          'Authentication failed! Please Login again',
          'Expect error to be Authentication failed! Please Login again');
        assert.isNull(err, 'Expect error to not exist');
        done();
      });
  });
});
