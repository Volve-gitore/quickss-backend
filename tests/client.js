import chai from 'chai';
import server from '../src/server';
import chaiHttp from 'chai-http';
import fs from 'fs';

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('Client tests', () => {
  /**
   * register hotel test
   */
  it('should register client', (done) => {
    chai
      .request(server)
      .post('/api/clients')
      .set('Content-Type', 'application/json')
      .field('name', 'hotel one')
      .field('category', 'hotel')
      .field('description', 'Sample text')
      .field('bouquet', 'basic')
      .field('status', 'active')
      .field('location', 'Kigali')
      .attach('image', fs.readFileSync(`${__dirname}/mock/sample.jpeg`), 'sample.jpeg')
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('hotel added successful');
        done();
      });
  });

  it('should not register client twice', (done) => {
    chai
      .request(server)
      .post('/api/clients')
      .set('Content-Type', 'application/json')
      .field('name', 'quickss-hotel')
      .field('category', 'hotel')
      .field('description', 'Sample text')
      .field('bouquet', 'basic')
      .field('status', 'active')
      .field('location', 'Kigali')
      .attach('image', fs.readFileSync(`${__dirname}/mock/sample.jpeg`), 'sample.jpeg')
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.error.should.equal('client already registered');
        done();
      });
  });

  it('should not register client without providing the "name"', (done) => {
    chai
      .request(server)
      .post('/api/clients')
      .set('Content-Type', 'application/json')
      .field('category', 'hotel')
      .field('description', 'Sample text')
      .field('bouquet', 'basic')
      .field('status', 'active')
      .field('location', 'Kigali')
      .attach('image', fs.readFileSync(`${__dirname}/mock/sample.jpeg`), 'sample.jpeg')
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error[0].should.equal('name is required');
        done();
      });
  });
});
