import chai from 'chai';
import index from '../src/index';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('User tests', () => {
  it('should not register a user with an existing username', (done) => {
    const user = {
      username: 'testUser',
      email: 'testuser2@test.com',
      password: 'Test@Quickss12345!',
      confirmPassword: 'Test@Quickss12345!',
      phoneNo: '0700000002',
    };
    chai
      .request(index)
      .post('/api/user/auth/signup')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.error.should.equal('username already taken, Please choose another!');
      });
      done();
  });
  it('should not register a user with an existing email ', (done) => {
    const user = {
      username: 'testUser2',
      email: 'testuser@test.com',
      password: 'Test@Quickss12345!',
      confirmPassword: 'Test@Quickss12345!',
      phoneNo: '0700000002',
    };
    chai
      .request(index)
      .post('/api/user/auth/signup')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.should.equal('email must be unique');
      });
      done();
  });

  it('should not register a user with an invalid phone number ', (done) => {
    const user = {
      username: 'testUser2',
      email: 'testuser2@test.com',
      password: 'Test@Quickss12345!',
      confirmPassword: '1234512345aA',
      phoneNo: 'invalid phone number',
    };
    chai
      .request(index)
      .post('/api/user/auth/signup')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error[0].should.equal('invalid phone number');
      });
      done();
  });

  it('should not register a user with an un-confirmend password', (done) => {
    const user = {
      username: 'testUser2',
      email: 'testuser2@test.com',
      password: 'Test@Quickss12345!',
      confirmPassword: '1234512345aA',
      phoneNo: '0700000002',
    };
    chai
      .request(index)
      .post('/api/user/auth/signup')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error[0].should.equal("Password don't match");
      });
      done();
  });

  it('should register a new user', (done) => {
    const user = {
      username: 'testUser2',
      email: 'testuser2@test.com',
      password: 'Test@Quickss12345!',
      confirmPassword: 'Test@Quickss12345!',
      phoneNo: '0700000002',
    };
    chai
      .request(index)
      .post('/api/user/auth/signup')
      .send(user)
      .end((err, res) => {
        console.log(res.body);
        res.status.should.equal(201);
        res.body.should.have.property('username');
        res.body.should.have.property('phoneNo');
        res.body.should.have.property('role');
        res.body.should.have.property('token');
        res.body.message.should.equal('Thank you for joining us, Please check your phone for verification');
      });
      done();
  });
});
