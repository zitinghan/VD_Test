import cors from 'cors';
import express from 'express';
import 'dotenv/config'; //setting global env
import bodyParser from 'body-parser';
import routes from './routes/versionControl';

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('', routes);

//app.get('/', (req, res) => res.send('Hello World!'))


// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  });
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}!`))