// room.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Room } from './room.model';
import * as RoomActions from './room.actions';

export interface RoomState {
  rooms: Room[];
  error: any;
}

const initialState: RoomState = {
  rooms: [],
  error: null,
};

export const roomReducer = createReducer(
  initialState,
  on(RoomActions.loadRoomsSuccess, (state, { rooms }) => ({ ...state, rooms })),
  on(RoomActions.loadRoomsFailure, (state, { error }) => ({ ...state, error }))
);
