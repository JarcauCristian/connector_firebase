import express from 'express';
import cors from 'cors';
import App from './index';
import Retrieve from './controllers/Retrieve';

const retrieveController = new Retrieve();
const app = new App({
  port: 5000,
  controllers: [    
    retrieveController
  ],
  middleWares: [
    express.json({ limit: '10mb' }),
    express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
    cors(),
  ],
});

app.listen();


