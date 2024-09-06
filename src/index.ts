import express, {Express} from 'express';
import cors from 'cors';
import {routers} from './routers';
import bodyParser from 'body-parser';

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routers);

app.listen('8000', async () => {
  console.log('Server Started');
});
