import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../app';

chai.use(chaiHttp);

describe('User can sign up', () => {
  it('Should create an account', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: 'Tester',
        lastname: 'Obodokuna',
        password: 'testTest12345',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagba@gmail.com',
      })
      .end((err, res) => {
        console.log(res.body);
        expect(res.body).to.be.an('object');
        expect(res.statusCode).to.equals(201);
        expect(res.body.data).to.be.an('object');
        expect(res.body.status).to.equal(201);
        done();
      });
  });

  it('Should return an error message if firstname is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: '',
        lastname: 'Obodokuna',
        password: 'testTest12345',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagba@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.body.error).to.equals('Name fields cannot be empty');
        done();
      });
  });

  it('Should return an error message if lastname is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: 'Tester',
        lastname: '',
        password: 'testTest12345',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagba@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.body.error).to.equals('Name fields cannot be empty');
        done();
      });
  });

  it('Should return an error message if password is empty', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: 'Tester',
        lastname: 'Obodokuna',
        password: '',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagba@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.body.error).to.equals('Password field cannot be empty');
        done();
      });
  });

  it('Should return an error message if password is less than 8 characters', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: 'Tester',
        lastname: 'Obodokuna',
        password: 'test12',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagba@gmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.body.error).to.equals('Password cannot be less than 8 characters');
        done();
      });
  });

  it('Should return an error message if email is not valid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .set({
        'Content-type': 'application/json',
      })
      .send({
        firstname: 'Tester',
        lastname: 'Obodokuna',
        password: 'testTest12345',
        address: '13, qeerrfkf kfkmfkm kfmkfmkkmfmkf',
        email: 'alagbagmail.com',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equals(400);
        expect(res.body.error).to.equals('Please provide a valid email address');
        done();
      });
  });
});
