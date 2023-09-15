import express, { Application } from 'express';
import route from './routes/route';
import "dotenv/config.js"
import cors from 'cors'
import { sync } from './config/db';
import compression from 'compression';




try {
  sync()
  console.log("database terkoneksi");
} catch (error) {
  console.log("database gagal terkoneksi")
}

const app: Application = express();
app.use(compression())
app.use(cors({ credentials: true, origin: "*" }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/', route)

const port: number = 5001;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});



