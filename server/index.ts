import express from 'express';
import router from './routes/payment';

const app = express();
const PORT: number = 3000;

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
