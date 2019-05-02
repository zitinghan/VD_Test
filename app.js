import cors from 'cors';
import express from 'express';
import 'dotenv/config'; //setting global env
import logger from 'morgan';
import bodyParser from 'body-parser';
import versionControlRoutes from './routes/versionControl';

const app = express();

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.HOST}/${process.env.DB_NAME}`, { useNewUrlParser: true });


app.use(cors());
app.use(bodyParser.json()); // only allow json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));


app.use('/api/vc', versionControlRoutes); //VC router

// catch error 404
app.use ((req, res, next) => {
  const err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  res.status(status).json({
    'errors': {
      message: error.message
    }
  });
  console.error(err);
});

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}!`))