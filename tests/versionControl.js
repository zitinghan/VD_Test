// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import router from '../routes/versionControl';

// Configure chai
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('API Test', function () {
  /* describe('getKey() function', function () {
    it('Should error out if no name provided ', function () {
      router.getKey(req, res);
      expect(res.sendCalledWith).to.contain('error');
    });
  }); */

  describe("GET /", () => {
    it("should get data", (done) => {
      chai.request(app)
        .get('/api/vc/001')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});