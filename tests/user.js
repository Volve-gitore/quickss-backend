import chai from 'chai';
import server from '../src/server';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('User tests', () => {
  /**
   * signup tests
   */
  it('should not register a user with an existing username', done => {
    const user = {
      username: 'testUser',
      email: 'testuser@test.com',
      password: 'Test@Quickss12345!',
      confirmPassword: 'Test@Quickss12345!',
      phoneNo: '0700000002',
    };
    chai
      .request(server)
      .post('/api/user/auth/signup')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.error.should.equal('username already taken, Please choose another!');
        done();
      });
  });
  it('should not register a user with an existing email ', done => {
    const user = {
      username: 'testUser2',
      email: 'testuser@test.com',
      password: 'Test@Quickss12345!',
      confirmPassword: 'Test@Quickss12345!',
      phoneNo: '0700000002',
    };
    chai
      .request(server)
      .post('/api/user/auth/signup')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.should.equal('email must be unique');
        done();
      });
  });

  it('should not register a user with an invalid phone number ', done => {
    const user = {
      username: 'testUser2',
      email: 'testuser2@test.com',
      password: 'Test@Quickss12345!',
      confirmPassword: '1234512345aA',
      phoneNo: 'invalid phone number',
    };
    chai
      .request(server)
      .post('/api/user/auth/signup')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error[0].should.equal('invalid phone number');
        done();
      });
  });

  it('should not register a user with an un-confirmend password', done => {
    const user = {
      username: 'testUser2',
      email: 'testuser2@test.com',
      password: 'Test@Quickss12345!',
      confirmPassword: '1234512345aA',
      phoneNo: '0700000002',
    };
    chai
      .request(server)
      .post('/api/user/auth/signup')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error[0].should.equal("Password don't match");
        done();
      });
  });

  it('should register a new user', done => {
    const user = {
      username: 'testUser2',
      email: 'testuser2@test.com',
      password: 'Test@Quickss12345!',
      confirmPassword: 'Test@Quickss12345!',
      phoneNo: '0700000002',
    };
    chai
      .request(server)
      .post('/api/user/auth/signup')
      .send(user)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.user.should.have.property('username');
        res.body.user.should.have.property('phoneNo');
        res.body.user.should.have.property('role');
        res.body.should.have.property('token');
        res.body.message.should.equal('thank you for joining us, Please check your phone for verification');
        done();
      });
  });

  /**
   * login tests
   */
  it('should not login without username or password', done => {
    const credentials = {
      username: '',
      password: '',
    };
    chai
      .request(server)
      .post('/api/user/auth/signin')
      .send(credentials)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error[0].should.equal('username is not allowed to be empty');
        res.body.error[1].should.equal('password is not allowed to be empty');
        done();
      });
  });

  it('should not login unregistered user', done => {
    const credentials = {
      username: 'unknownUser',
      password: 'Test@Quickss12345!',
    };
    chai
      .request(server)
      .post('/api/user/auth/signin')
      .send(credentials)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.error.should.equal('unknownUser not found');
        done();
      });
  });

  it('should not login unverified user', done => {
    const credentials = {
      username: 'unverified_user',
      password: 'Test@Quickss12345!',
    };
    chai
      .request(server)
      .post('/api/user/auth/signin')
      .send(credentials)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.error.should.equal('account not verified, please check your phone message for verification');
        done();
      });
  });

  it('should not login with incorrect password', done => {
    const credentials = {
      username: 'testUser',
      password: 'wrong_password',
    };
    chai
      .request(server)
      .post('/api/user/auth/signin')
      .send(credentials)
      .end((err, res) => {
        res.status.should.equal(401);
        res.body.error.should.equal('incorrect password');
        done();
      });
  });

  it('should login successful', done => {
    const credentials = {
      username: 'testUser',
      password: 'Test@Quickss12345!',
    };
    chai
      .request(server)
      .post('/api/user/auth/signin')
      .send(credentials)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('successfully logged in');
        res.body.user.should.have.property('username');
        res.body.user.should.have.property('phoneNo');
        res.body.user.should.have.property('role');
        res.body.should.have.property('token');
        done();
      });
  });
});
//   /**
//    * forgot password tests
//    */
describe('Reset password', () => {
  it('should not allow empty user account ', done => {
    const userAccount = '';
    chai
      .request(index)
      .post('/api/user/forgot-password')
      .send(userAccount)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message[0].should.equal('userAccount is required');
        done();
      });
  });

  it('should send verification code to existing email', done => {
    const forgotData = {
      userAccount: 'cyuzuzonaddy@gmail.com',
      code: 22223,
    };
    chai
      .request(index)
      .post('/api/user/forgot-password')
      .send(forgotData)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('please check your email for password reset');
        done();
      });
  });
  it('should send verification code to existing phone number', done => {
    const forgotData = {
      userAccount: '+250786117078',
      code: 22223,
    };
    chai
      .request(index)
      .post('/api/user/forgot-password')
      .send(forgotData)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal(
          `We\'ve sent verification code to ${forgotData.userAccount}.Enter that code to reset your password`,
        );
        done();
      });
  });
  //   /**
  //    * reset password tests
  //    */
  it('should not reset with empty password', done => {
    const user = {
      password: ' ',
      usercode: '22223',
    };
    chai
      .request(index)
      .post(`/api/user/reset-password/${user.usercode}`)
      .send(user)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message[0].should.equal(
          'password must contain atleast 8 characters(upper/lower case, number & symbol)!',
        );
        done();
      });
  });

  it('should reset user password', done => {
    const user = {
      password: 'Test@Quickss12345!',
      confirmPassword: 'Test@Quickss12345!',
      usercode: '22223',
    };
    chai
      .request(index)
      .post(`/api/user/reset-password/${user.usercode}`)
      .send(user)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal('password changed successfully');
        done();
      });
  });
});
