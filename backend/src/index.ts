import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
const PropertiesReader = require('properties-reader');

import router from './router';


const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const prop = PropertiesReader('./app.properties');
const getProperty = (pty: string) => {
    return prop.get(pty);
}
const server = http.createServer(app);
const port = parseInt(getProperty('server.port'));
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});

const dbMongoUsername: string = getProperty('db.mongo.username');
const dbMongoPassword: string = getProperty('db.mongo.password');
const MONGO_URL: string = `mongodb+srv://${dbMongoUsername}:${dbMongoPassword}@cluster0.ikk0ats.mongodb.net/?retryWrites=true&w=majority`; // DB URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());