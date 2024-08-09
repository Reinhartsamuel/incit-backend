import { json, urlencoded } from 'body-parser';
import express from 'express';
import userRoutes from './routes/users';
import analyticsRoutes from './routes/analytics';
import connection from './db/config';
import dotenv  from "dotenv"
const cors = require('cors')

dotenv.config();

const app = express();
app.use(cors())
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/analytics', analyticsRoutes);

app.use((
    err:Error,
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
 ) => {
    res.status(500).json({ message : err.message })
});


connection.sync().then(() => {
        console.log('db synced!');
}).catch((e) => {
    console.log('Error occured::', e)
});


app.listen(3000);

 