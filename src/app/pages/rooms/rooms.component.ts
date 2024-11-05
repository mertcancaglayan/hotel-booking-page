import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import * as RoomActions from '../../states/room/room.actions';
import { selectRoomError, selectRooms } from '../../states/room/room.selectors';
import { Room } from '../../states/room/room.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  roomsSubject: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  error$: Observable<any>;

  constructor(private store: Store, private roomService: RoomService) {
    this.error$ = this.store.select(selectRoomError);
  }

  ngOnInit(): void {
    this.store.dispatch(RoomActions.loadRooms());
    this.store.select(selectRooms).subscribe((rooms) => {
      const mutableRooms = rooms.map((room) => ({ ...room }));
      this.roomsSubject.next(mutableRooms);
    });
  }

  onUpdate(id: number, updatedRoom: Room) {
    this.roomService.updateRoom(id, updatedRoom).subscribe(
      (response) => {
        console.log('Room updated successfully');
      },
      (error) => {
        console.error('Error updating room');
      }
    );
  }

  onDelete(id: number) {
    this.store.dispatch(RoomActions.deleteRoom({ roomId: id }));
  }

  addNewRoom() {
    const newRoom: Room = {
      roomId: 0,
      roomName: '',
      isAcAvailable: false,
      roomCapacity: 0,
      isActive: false,
      roomTariff: 0,
      extensionNo: '',
    };
    this.store.dispatch(RoomActions.addRoom({ room: newRoom }));
  }
}
