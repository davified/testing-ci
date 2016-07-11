const express = require('express')
const router = express.Router()
var candies = [
  {id:1,name:"Chewing Gum",color:"Red"},
  {id:2,name:"Pez",color:"Green"},
  {id:3,name:"Marshmallow",color:"Pink"},
  {id:4,name:"Candy Stick",color:"Blue"}]

// ROOT
router.get('/', (req, res) => {
  res.status(200).json({
    title: "this is an index page"
  })
})

// INDEX
router.get('/candies', (req, res) => {
  res.status(200).json(candies)
})

// SHOW
router.get('/candies/:id', (req, res) => {
  res.status(200).json(candies[req.params.id - 1])
})

// CREATE
router.post('/candies', (req, res) => {
  var candy = {}
  candy.id = req.body.id
  candy.name = req.body.name
  candy.color = req.body.color
  if (req.body.color === null) {
    res.status(422).json({message: "error"})
    done()
  } else if (req.body.color) {
    candies.push(candy)
    res.status(201).json(candies)
  }
})

// PUT
router.put('/candies/:id', (req, res) => {
  candyEdit = candies[req.params.id - 1]
  candyEdit.name = req.body.name
  candyEdit.color = req.body.color
  res.status(201).json(candies[req.params.id - 1])
})

// DELETE
router.delete('/candies/:id', (req, res) => {
  i = req.params.id - 1
  candies.splice(i, 1);
  res.status(200).json(candies)
})

module.exports = router
