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
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

const userRoute = require('./routes/user');
const cookieRoute = require('./routes/cookie');


app.use('/api/user', userRoute);
app.use('/api/cookie',cookieRoute);

//console.log(Intl.DateTimeFormat().resolvedOptions().timeZone );

app.listen(process.env.PORT || '3000', () => {
  console.log(`Server Running on port: ${process.env.PORT || '3000'}`);
});


