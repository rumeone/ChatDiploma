import {UserI} from "../../../user/models/user.interface";

export interface ConnectedUserI {
    id?: number;
    socketId: string;
    user: UserI;
}