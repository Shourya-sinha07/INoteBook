const express = require('express');
const mongodb = require('./db');
require('dotenv').config();

var cors=require('cors')
mongodb();
const app = express() 
const port = 5000

app.use(cors())
app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// Available Routes 
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes')) 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})    