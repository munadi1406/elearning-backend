import express, { Application } from 'express';
import route from './routes/route';
import "dotenv/config.js"
import cors from 'cors'





const app: Application = express();
app.use(cors({credentials:true,origin:"*"}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  await prisma.$connect();
  console.log('Terhubung ke database.');
} catch (error) {
  console.error('Gagal terhubung ke database:', error);
} finally {
  await prisma.$disconnect();
}

app.get('/', (req, res) => {
    res.send("oke coy")
  });


app.use('/api/',route)

const port: number = 3000;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});



