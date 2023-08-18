import express, { Application } from 'express';
import route from './routes/route';
import "dotenv/config.js"





const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/',route)

const port: number = 3000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});



