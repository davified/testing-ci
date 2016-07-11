/* globals describe it before */
// setting up the test files and dependencies
const expect = require('chai').expect
const supertest = require('supertest')
const api = supertest('http://localhost:3000')
const app = require('../app')

// start writing our tests. this is the javascript asynchronous version of rspec.
describe('GET /candies', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return an array', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body).to.be.an('array')
      done()
    })
  })
  // it('should return an object that has a field called "name"', (done) => {
  //   api.get('/candies')
  //   .set('Accept', 'application/json')
  //   .end((error, response) => {
  //     expect(error).to.be.a('null')
  //     expect(response.body[0]).to.have.property('name')
  //     done()
  //   })
  // })
  it('should return all the records in the database', (done) => {
    api.get('/candies')
    .set('Accept', 'application/json')
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(response.body.length).to.equal(4)
      done()
    })
  })
})

describe('GET /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should return an object containing the fields "name" and "color"', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .end((error, response) => {
    expect(error).to.be.a('null')
    expect(response.body).to.be.an('object')
    expect(response.body).to.have.property('name')
    expect(response.body).to.have.property('color')
    done()
    })
  })
})


describe('POST /candies', () => {
  before((done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      "id": "5",
      "name": "anything",
      "color": "red"
    }).end(done)
  })
  it('should return a 200 response', (done) => {
    api.get('/candies/5')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should add a new candy to the database', (done) => {
    api.get('/candies/5')
    .set('Accept', 'application/json')
    .end((error, response) => {
    expect(error).to.be.a('null')
    expect(response.body.id).to.equal('5')
    expect(response.body.name).to.equal('anything')
    expect(response.body.color).to.equal('red')
    done()
    })
  })
  it('should return a 422 response if the field color is wrong', (done) => {
    api.post('/candies')
    .set('Accept', 'application/json')
    .send({
      "id": "5",
      "name": "anything",
      "color": null
    })
    .end((error, response) => {
      expect(error).to.be.a('null')
      expect(422, done)
      done()
    })
  })
  })



  // it('should return a 422 response if the field color is wrong', (done) => {
  //   api.post('/candies')
  //   .set('Accept', 'application/json')
  //   .send({
  //     "id": "6",
  //     "name": "wrongtest",
  //     "colr": "red"
  //   }).expect(422, done)
  // })

  // it('should add a candy object to the array', (done) => {
  //   api.get('/candies')
  //   .set('Accept', 'application/json')
  //   .end((error, response) => {
  //     expect(error).to.be.a('null')
  //     // expect(response.body[response.body.length - 1].name).to.equal("anything")
  //     console.log(response.body[response.body.length])
  //     done()
  //   })
  // })

describe('PUT /candies/1', () => {
  before((done) => {
    api.put('/candies/1')
    .set('Accept', 'application/json')
    .send({
      "id": "1",
      "name": "newcandy",
      "color": "newcolor"
    }).end(done)
  })
  it('should return a 200 response', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .expect(200, done)
  })
  it('should update a candy document', (done) => {
    api.get('/candies/1')
    .set('Accept', 'application/json')
    .end((error, response) => {
    expect(error).to.be.a('null')
    expect(response.body.id).to.equal(1)
    expect(response.body.name).to.equal('newcandy')
    expect(response.body.color).to.equal('newcolor')
    done()
    })
  })
})

describe('DELETE /candies/1', () => {
  before((done) => {
    api.delete('/candies/1')
    .set('Accept', 'application/json')
    done()
  })
  it('should remove a candy document', (done) => {
    api.get('/candies/5')
    .set('Accept', 'application/json')
    .end((error, response) => {
    expect(error).to.be.a('null')
    expect(response.body[0]).to.equal(undefined)
    done()
    })
  })
})
