import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';

@WebSocketGateway({cors: {origin: ['https://hoppscotch.io', 'http://localhost:3000', 'http://localhost:4200']}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server;

    /*@SubscribeMessage('message')
    handleMessage(client: any, payload: any) {
        this.server.emit('message', 'test');
    }*/

    handleConnection(client: any, ...args): any {
        console.log('On connect: ');
        this.server.emit('message', 'test');
    }

    handleDisconnect(client: any): any {
        console.log('On disconnect: ');
    }
}
