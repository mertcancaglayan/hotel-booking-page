import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../states/room/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'https://6724f82bc39fedae05b36f8b.mockapi.io/api/v1/';

  constructor(private _http: HttpClient) {}

  login(obj: any): Observable<any> {
    return this._http.get(this.apiUrl + 'login');
  }

  getAllRooms(): Observable<Room[]> {
    return this._http.get<Room[]>(`${this.apiUrl}getAllRooms`);
  }

  createRoom(room: Room): Observable<Room> {
    return this._http.post<Room>(`${this.apiUrl}getAllRooms`, room);
  }

  updateRoom(roomId: number, room: Room): Observable<Room> {
    return this._http.put<Room>(`${this.apiUrl}getAllRooms/${roomId}`, room);
  }

  deleteRoom(roomId: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}getAllRooms/${roomId}`);
  }
}
