import {UserI} from "../../../user/models/user.interface";
import {RoomI} from "../room/room.interface";

export interface JoinedRoomI {
    id?: number;
    room: RoomI;
    socketId: string;

    user: UserI;

}