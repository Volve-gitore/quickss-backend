import chai from 'chai';
import server from '../src/server';
import chaiHttp from 'chai-http';
import fs from 'fs';

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('Hotel & Resto tests', () => {
  /**
   * register hotel test
   */
  it('should register a hotel or resto', (done) => {
    chai
      .request(server)
      .post('/api/hotel-resto')
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

  it('should not register a hotel or resto twice', (done) => {
    chai
      .request(server)
      .post('/api/hotel-resto')
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
        res.body.error.should.equal('hotel already registered');
        done();
      });
  });

  it('should not register a hotel or resto without a name', (done) => {
    chai
      .request(server)
      .post('/api/hotel-resto')
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
