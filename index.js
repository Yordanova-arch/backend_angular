const express = require('express');
const mongoose = require('mongoose');
const cors = require('.//middlewares/cors');
const themaController = require('./controllers/themaController');
const userController = require('./controllers/userController');

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


  const app = express();
  // app.use(urlencoded({extended:true}))
  app.use(cors());
  app.use(express.json());

  app.use('/thema', themaController);
  app.use('/user', userController);


  const port = 3000;

  app.get('/', (req, res) => res.send('It works!'));

  app.listen(port, () => {
    console.log(`REST Service is running on port ${port}...`)
  });
}