 require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const route = require('./routes/task-routes');

const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL; 

const app = express();
app.use(cors());
app.use(express.json());
app.use('/tasks', route);

mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error occurred while connecting to the database:", error);
  });
