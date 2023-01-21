import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/search.route';
import { requestLoggerMiddleware } from './utils/middleware';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.resolve(__dirname, 'api-doc/swagger.yaml'));

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (_req, _res) => {
    _res.send("Cachie");
});

app.use('/v1', router);

export default app