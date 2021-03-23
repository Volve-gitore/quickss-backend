import chai from 'chai';
import server from '../src/server';
import chaiHttp from 'chai-http';
import fs from 'fs';

chai.use(chaiHttp);
chai.should();
chai.expect();

describe('Product tests', () => {
  /**
   * create group test
   */
  it('should create group', (done) => {
    const group = {
      name:'breakfast',
      hotelRestoId: '1'
    };
    chai
      .request(server)
      .post('/api/group/')
      .send(group)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('breakfast added successfully');
        done();
      });
  });

  it('should not create existing group', (done) => {
    chai
      .request(server)
      .post('/api/group')
      const group = {
        name:'breakfast',
        hotelRestoId: '1'
      };
      chai
        .request(server)
        .post('/api/group')
        .send(group)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.should.equal('group already exist');
        done();
      });
  });
/**
   * create category test
   */
  it('should create category', (done) => {
    const category = {
      name:'Pizza',
      hotelRestoId: '1'
    };
    chai
      .request(server)
      .post('/api/category')
      .send(category)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Pizza added successfully');
        done();
      });
  });

  it('should not create existing category', (done) => {
    const category = {
      name:'Pizza',
      hotelRestoId: '1'
    };
    chai
      .request(server)
      .post('/api/category')
      .send(category)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.should.equal('Category already exist');
        done();
      });
  });
  /**
   * create subcategory test
   */
  it('should create subCategory', (done) => {
    const subCategory = {
      name:'Pizza masalla',
      hotelRestoId: '1'
    };
    chai
      .request(server)
      .post('/api/subCategory')
      .send(subCategory)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Pizza masalla added successfully');
        done();
      });
  });

  it('should not create existing subCategory', (done) => {
    const subCategory = {
      name:'Pizza masalla',
      hotelRestoId: '1'
    };
    chai
      .request(server)
      .post('/api/subCategory')
      .send(subCategory)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.error.should.equal('subCategory already exist');
        done();
      });
  });
  /**
   * register product test
   */
  it('should register product', (done) => {
    const product = {
      productId: 'P00010',
          name: 'Pizza',
          type: 'food',
          price: '1600',
          flag: '1',
          hotelRestoId: '1',
          groupId: '1',
          categoryId: '1',
          subCategoryId: '1',
    };
    chai
      .request(server)
      .post('/api/product')
      .send(product)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.message.should.equal('Pizza created successfully');
        done();
      });
  });

  it('should not register existing product', (done) => {
    const product = {
      productId: 'P0009',
          name: 'Pizza',
          type: 'food',
          price: '1600',
          flag: '1',
          hotelRestoId: '1',
          groupId: '1',
          categoryId: '1',
          subCategoryId: '1',
    };
    chai
      .request(server)
      .post('/api/product')
      .send(product)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.message.should.equal('Pizza already exist');
        done();
      });
  });
});
