import express, {Express} from 'express';
import cors from 'cors';
import {routers} from './routers';
import bodyParser from 'body-parser';
import {redisConnect} from './service/RedisService';

if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then(({config}) => {
    config();
  });
}

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routers);

redisConnect();

app.listen(port, async () => {
  console.log('Server Started');
});
