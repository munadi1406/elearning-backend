import { Server } from 'ws';
import { createComments, getCommentByPostId } from '../model/CommentsModel';
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
        const decodedToken:any = verifyAccessToken(token[1]);
  
        if (messageData.action === 'getComments') {
          try {
            const comments = await getCommentByPostId(messageData.id_post);
            ws.send(JSON.stringify({ action: 'comments', data: comments }));
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
        } else if(messageData.action === 'postComments') {
          const {idPost, comment} = messageData.data
          if (typeof idPost !== 'number' || isNaN(idPost)) {
            return ws.send(JSON.stringify({ action: 'errorMessage', message: "ID Post tidak valid" }));
          }
          
          if (typeof comment !== 'string' || comment.trim() === '') {
            return ws.send(JSON.stringify({ action: 'errorMessage', message: "Komentar Kosong" }));
          }
          const idUsers:number = Number(decodedToken.id_users);
          const create = await createComments({
            id_users: idUsers,
            id_post: idPost,
            comment: comment
          });
          if(!create){
            return  ws.send(JSON.stringify({ action: 'postComments', message:"Failed Post Comment" }));
          }
          ws.send(JSON.stringify({ action: 'errorMessage', message:"Success Post Comment" }));
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
