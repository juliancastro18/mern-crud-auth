import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from '../api/index.js';
import config from '../config/index.js'

export default ({ app }: { app: express.Application }) => {

  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.enable('trust proxy');
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan("dev"));
  app.use(config.api.prefix, routes());
  

  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// error handlers
  app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  
  app.use((err, req: express.Request, res: express.Response, next: express.NextFunction) => {
    let joiErrors = [];
    err.details?.forEach(d => joiErrors.push(d.message))

    res.status(err.status || 500);
    res.json({
      errors: {
        message: joiErrors.join(', ') || err.message,
      },
    });
  });

};