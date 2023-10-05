import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/payment';
const app = express();
const PORT = 3000;
// parse request body as a json and url encoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
