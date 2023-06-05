import {UserI} from "./user.interface";
import {RoomI} from "./room.interface";
import {Meta} from "./meta.interface";

export interface MessageI {
  id?: number;
  text: string;
  user: UserI;
  room: RoomI;
  created_at: Date;
  updated_at: Date;
}

export interface MessagePaginateI {
   items: MessageI[];
   meta: Meta;
}
