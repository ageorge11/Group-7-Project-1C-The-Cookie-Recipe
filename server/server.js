const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  console.log('Can\'t find the env file');
  throw result.error;
}

const app = express();

const corsOptions = {
  credentials: true
};


app.listen(process.env.PORT || '3000', () => {
  console.log(`Server Running on port: ${process.env.PORT || '3000'}`);
});


