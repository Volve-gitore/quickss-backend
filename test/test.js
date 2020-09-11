import chai from 'chai';
import index from '../src/index';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();
chai.expect();
it('Main page content',async () => {
  const res = await chai.request(index).get('/');
        res.status.should.equal(200);
        res.text.should.equal('QuicKss app backend!');
  });