// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models/versionControl';

import { testData } from "./testData";

// Configure chai
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe('API Test', () => {
  
  it(`Post first data through API - ${new Date().getTime()}`, async () => {
    const res = await chai.request(app).post('/api/vc').send(testData.postData[0]);
    expect(res).to.have.status(200);
  }); 

  it(`Get first data, compare 1st value ${JSON.stringify(testData.postData[0])}`, async () => {
    const postDataKey = Object.keys(testData.postData[0])[0];
    const res = await chai.request(app).get('/api/vc/' + postDataKey);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.data[0].key.should.equal(postDataKey);
    res.body.data[0].value.should.equal(testData.postData[0][postDataKey]);
  });

  it(`Post second data through API - ${new Date().getTime()}`, async () => {
    const res = await chai.request(app).post('/api/vc').send(testData.postData[1]);
    expect(res).to.have.status(200);
  });

  it(`Get second data, compare 2nd value - ${JSON.stringify(testData.postData[1])}`, async () => {
    const postDataKey = Object.keys(testData.postData[0])[0];
    const res = await chai.request(app).get('/api/vc/' + postDataKey);
    res.should.have.status(200);
    res.body.should.be.a('object');
    res.body.data[0].key.should.equal(postDataKey);
    res.body.data[0].value.should.equal(testData.postData[1][postDataKey]);
  });
  
  it('Validate the actual value by minus milisecond from last value time', async () => {
    const postDataKey = Object.keys(testData.postData[0])[0];
    const lastDataRes = await chai.request(app).get('/api/vc/' + postDataKey);
    const lastDataTime = lastDataRes.body.data[0].createdAt;
    const lastDataTimeMili = changeDateToMili(lastDataTime);
    const lastDataTimeMiliDeducted = lastDataTimeMili- 1;
    const res = await chai.request(app).get(`/api/vc/${postDataKey}?timestamp=${lastDataTimeMiliDeducted}`);
    console.log(`\n second data time: ${lastDataTimeMili}, data: ${lastDataRes.body.data[0].value}`);
    console.log(`\n query time : ${lastDataTimeMiliDeducted}`);
    console.log(`\n first data time : ${ changeDateToMili(res.body.data[0].createdAt)}, data: ${ res.body.data[0].value } `);
    res.body.data[0].value.should.equal(testData.postData[0][postDataKey]); // get the first testing data
  });

  it('Remove all the testing data', async () => {
    const res = await models.deleteMany({ key: Object.keys(testData.postData[0])[0]});
    res.ok.should.equal(1);
  });

});

function changeDateToMili(date){
  return new Date(date).getTime();
};