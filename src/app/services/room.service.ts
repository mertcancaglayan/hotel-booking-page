import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
  message: string
  result: boolean
  userData: UserData
  id: string
}

export interface UserData {
  userId: number
  username: string
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  apiUrl: string = 'https://6724f82bc39fedae05b36f8b.mockapi.io/api/v1/';

  constructor(private _http: HttpClient) {}

  login(obj: any) {
    return this._http.get(this.apiUrl + 'login');
  }
}
