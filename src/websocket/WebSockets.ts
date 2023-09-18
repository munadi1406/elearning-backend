import { Server } from 'ws';
import { getCommentByPostId } from '../model/CommentsModel';
import { verify } from 'jsonwebtoken';
import { verifyAccessToken } from '../services/jwtService';

export class WebSocketServer {
  private wss: Server;
  private clients: Set<any> = new Set();

  constructor(server: any) {
    this.wss = new Server({ server });
    this.wss.on('connection', this.handleConnection.bind(this));
  }

  private handleConnection(ws: any) {
    ws.on('error', console.error);
    this.clients.add(ws);
  
    ws.on('message', async (data: any) => {
      const messageData = JSON.parse(data);
      const jwtToken = messageData.token;
  
      if (!jwtToken) {
        ws.send("Unauthorized: Missing JWT");
        return; // Hentikan eksekusi lebih lanjut jika token JWT tidak ada.
      }
  
      try {
        // Verifikasi token JWT dengan kunci rahasia yang benar
        const token = jwtToken.split(' ')
        const decodedToken = verifyAccessToken(token[1]);
  
        if (messageData.action === 'getComments') {
          try {
            const comments = await getCommentByPostId(messageData.id_post);
            ws.send(JSON.stringify({ action: 'comments', data: comments }));
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
        } else {
          ws.send("Invalid Action"); // Tindakan tidak valid
        }
      } catch (error) {
        ws.send("Unauthorized: Invalid JWT");
      }
    });
  
    ws.send('web socket connected');
  
    ws.on('close', () => {
      this.clients.delete(ws);
    });
  }
  

  public sendUpdateToClients(updateData: any) {
    const updateMessage = JSON.stringify({ action: 'update', data: updateData });
    this.clients.forEach((client: any) => {
      client.send(updateMessage);
    });
  }
}
