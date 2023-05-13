import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {AuthService} from "../../auth/service/auth.service";
import {Server, Socket} from "socket.io";
import {UserI} from "../../user/models/user.interface";
import {UserService} from "../../user/service/user-service/user.service";
import {UnauthorizedException} from "@nestjs/common";

@WebSocketGateway({cors: {origin: ['https://hoppscotch.io', 'http://localhost:3000', 'http://localhost:4200']}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;
    title: string[] = [];

    constructor(private authService: AuthService, private userService: UserService) {
    }

    /*@SubscribeMessage('message')
    handleMessage(client: any, payload: any) {
        this.server.emit('message', 'test');
    }*/

    async handleConnection(socket: Socket) {
        try {
            const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
            const user: UserI = await this.userService.getOne(decodedToken.user.id);
            if (!user) {
                return this.disconnect(socket);
            } else {
                this.title.push('Value ' + Math.random().toString());
                this.server.emit('message', this.title);
            }
        } catch (e) {
            return this.disconnect(socket);
        }
    }

    handleDisconnect(socket: Socket): any {
        socket.disconnect();
    }

    private disconnect(socket: Socket) {
        socket.emit('Error ', new UnauthorizedException());
        socket.disconnect();
    }
}
