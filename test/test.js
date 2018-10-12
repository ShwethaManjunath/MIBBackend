process.env.NODE_ENV = 'test';
var admin = require('../routes/admin/admin');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
var expect = require('chai').expect;

chai.use(chaiHttp);

describe('admin', () => {
    it('it should get all products', (done) => {
        chai.request(server).get('/admin/products').end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})

/*
  * Test the /GET route
  */
describe('Data of All Cricketers', () => {
    it('it should GET all the Cricketers Data', (done) => {
        chai.request(server)
            .get('/players/')
            .end((err, res) => {
                if (err) { }
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.keys("player", "t20Match", "testMatch", "odiMatch");
                //  res.body.player[0].should.have.property('name');
                //  res.body[0].should.have.property('player_type');
                //  res.body.player.should.have.key('player_image');
                done();
            });
    });
})

describe('Data of  Cricketer By Id', () => {
    it('it should GET  the Cricketers Data By Id', (done) => {
        var pid = 253802;
        chai.request(server)
            .get('/players/' + pid)
            .end((err, res) => {
                if (err) { }
                res.should.have.status(200);
                // console.log(JSON.stringify(res.body.players))
                res.body.should.be.a('object');
                res.body.should.have.keys("t20", "test", "odi");
                res.body.t20.should.be.a('array');
                res.body.odi.should.be.a('array');
                res.body.test.should.be.a('array');
                done();
            });
    });
});