const express = require('express');

const mongoose = require('mongoose');
const cors = require('.//middlewares/cors');

const themaController = require('./controllers/themaController');
const photoController = require('./controllers/photoController');
const userController = require('./controllers/userController');
const auth = require('./middlewares/auth');

const port = 3000;


const app = express();

start();

async function start() {
  await new Promise((resolve,reject)=>{
    mongoose.connect('mongodb://localhost:27017/blogs-rest', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = mongoose.connection;
    db.on('error', (err) => {
      console.error('connection error: ', err);
      reject(err);
  });
  db.once('open', function () {
      //we're connected!
      console.log('Database ready');
      resolve();
  });

  });

 
  app.use(express.urlencoded({extended:true}))
  app.use(cors());
  app.use(express.json());
  app.use(auth());

  app.use('/thema', themaController);
  app.use('/photo', photoController);
  app.use('/user', userController);


  // app.get('/', (req, res) => res.send('It works!'));

  app.listen(port, () => {
    console.log(`REST Service is running on port ${port}...`)
  });
}