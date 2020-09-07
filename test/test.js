var chai  = require('chai');
var request = require('request');

it('Main page content', function(done) {
    request('http://localhost:3000/' , function(error, response, body) {
        chai.expect(body).to.equal('QuicKss app backend!');
        done();
    });
});