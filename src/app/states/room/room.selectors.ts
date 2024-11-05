import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoomState } from './room.reducer';

export const selectRoomState = createFeatureSelector<RoomState>('roomState');

export const selectRooms = createSelector(
  selectRoomState,
  (state: RoomState) => state.rooms
);

export const selectRoomError = createSelector(
  selectRoomState,
  (state: RoomState) => state.error
);
