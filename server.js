console.log('Welcome to Hawkins')

const express = require('express');  // npm install express --save
const app = express();
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 3000
require('dotenv').config() // npm install dotenv --save

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'stranger-things'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName}`)
        db = client.db(dbName)
        const peopleCollection = db.collection('people')

        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use('/images', express.static('images'));
        app.use(express.urlencoded({ extended: true }))
        app.use(express.json())

        app.get('/', function(req, res) {
            peopleCollection.find().toArray()
            .then(results => {
              console.log(results)
              res.render('index.ejs', { people: results })
            })
            .catch(error => console.error(error))
        })

        app.post('/people', (req, res) => {
            peopleCollection.insertOne(req.body)
              .then(result => {
                res.redirect('/')
                // console.log(result)
              })
              .catch(error => console.error(error))
          })

        app.put('/people', (req, res) => {
            peopleCollection.findOneAndUpdate(
                { species: 'Human',
                  status: 'alive' },
                {
                  $set: {
                    status: req.body.status,
                  }
                },
                {
                  upsert: true
                }
              )
                .then(result => {
                    res.json('Success')
                })
                .catch(error => console.error(error))
        })

        app.delete('/people', (req, res) => {
            peopleCollection.deleteOne(
              { species: req.body.species } // don't need to hardcode bx it's passed from fetch in main.js
            )
            .then(result => {
                if (result.deletedCount === 0) {
                  return res.json('No more monsters')
                }
                res.json(`Got em!`)
              })
              .catch(error => console.error(error))
          })

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch(error => console.error(error))