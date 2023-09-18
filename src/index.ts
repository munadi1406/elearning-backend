import express, { Application } from 'express';
import route from './routes/route';
import "dotenv/config.js"
import cors from 'cors'
import { sync } from './config/db';
import compression from 'compression';
import { createServer } from 'http';
import { WebSocketServer } from './websocket/WebSockets';




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
export const server = createServer(app);

export const webSocketInit = new WebSocketServer(server)


server.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});


