const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/index');

chai.should();
chai.use(chaiHttp);

describe('API Tests', () => {
  it('should register a miner', done => {
    chai.request(server)
      .post('/register/miner')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Miner registered successfully');
        done();
      });
  });

  it('should register a user', done => {
    chai.request(server)
      .post('/register/user')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('User registered successfully');
        done();
      });
  });

  it('should submit a prompt', done => {
    chai.request(server)
      .post('/prompt')
      .send({ content: 'Test prompt' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Prompt submitted successfully');
        done();
      });
  });
});