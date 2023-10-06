import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/payment';

const app = express();
const PORT: number = 3000;

// parse request body as a json and url encoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
