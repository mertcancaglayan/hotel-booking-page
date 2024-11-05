import { createAction, props } from '@ngrx/store';
import { Room } from './room.model';

export const loadRooms = createAction('[Rooms] Load Rooms');

export const loadRoomsSuccess = createAction(
  '[Rooms] Load Rooms Success',
  props<{ rooms: Room[] }>()
);
export const loadRoomsFailure = createAction(
  '[Rooms] Load Rooms Failure',
  props<{ error: any }>()
);

export const addRoom = createAction(
  '[Rooms] Add Room',
  props<{ room: Room }>()
);



export const deleteRoom = createAction(
  '[Rooms] Delete Room',
  props<{ roomId: number }>()
);
