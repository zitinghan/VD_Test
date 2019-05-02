import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import config from "./config";
import versionControlRoutes from './routes/versionControl';

const app = express();

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${config.db.host}/${config.db.name}`, { useNewUrlParser: true });


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

app.listen(config.app.port, () => console.log(`Listening on port ${config.app.port}!`))
module.exports = app;