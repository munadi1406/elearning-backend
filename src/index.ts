import express, { Application } from 'express';
import route from './routes/route';
import "dotenv/config.js"
import cors from 'cors'
import { sequelize } from './config/db';



try {
  sequelize.authenticate()
  sequelize.sync()
  console.log("database terkoneksi");
} catch (error) {
  console.log("database gagal terkoneksi")
}


const app: Application = express();
app.use(cors({ credentials: true, origin: "*" }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  res.send("oke coy")
});


app.use('/api/', route)

const port: number = 5000;
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});



