// This generic interface will represent the type of the response we get from the server
// T is a placeholder for any data type that will be specified when the interface is used
// It will hold the main data that will be returned
// If it should return a room than T will be Room (Response<Room>)
// If it should return multiple rooms than T will be Room[] (Response<Room[]>)

export interface Response<T> {
  payload: T;
  total: number;
}