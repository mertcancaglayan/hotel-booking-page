import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoomService } from '../../services/room.service';
import * as RoomActions from './room.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Room } from './room.model';

@Injectable()
export class RoomEffects {
  constructor(private actions$: Actions, private roomService: RoomService) {}

  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.loadRooms),
      switchMap(() =>
        this.roomService.getAllRooms().pipe(
          map((rooms: Room[]) => RoomActions.loadRoomsSuccess({ rooms })),
          catchError((error) => of(RoomActions.loadRoomsFailure({ error })))
        )
      )
    )
  );

  addRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.addRoom),
      mergeMap(({ room }) =>
        this.roomService.createRoom(room).pipe(
          map(() => RoomActions.loadRooms()),
          catchError((error) => of(RoomActions.loadRoomsFailure({ error })))
        )
      )
    )
  );

  deleteRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoomActions.deleteRoom),
      mergeMap(({ roomId }) =>
        this.roomService.deleteRoom(roomId).pipe(
          map(() => RoomActions.loadRooms()),
          catchError((error) => of(RoomActions.loadRoomsFailure({ error })))
        )
      )
    )
  );
}
