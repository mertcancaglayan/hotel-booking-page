export interface User {
  message: string;
  result: boolean;
  userData: UserData;
  id: string;
}

export interface UserData {
  userId: number;
  username: string;
  password: string;
}

export interface Room {
  roomId: number;
  roomName: string;
  isAcAvailable: boolean;
  roomCapacity: number;
  isActive: boolean;
  roomTariff: number;
  extensionNo: string;
}
