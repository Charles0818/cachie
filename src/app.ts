import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/search.route';
import { requestLoggerMiddleware } from './utils/middleware';

const app: express.Application = express();
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  
app.use(requestLoggerMiddleware({logger: console.log}));
app.use((req, res, next) => {
    req.query.timestamp = Date.now().toString();
    next()
})
app.get('/', (_req, _res) => {
    _res.send("Cachie");
});

app.use('/v1', router);

export default app