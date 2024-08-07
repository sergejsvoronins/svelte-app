import { writable, type Writable } from "svelte/store";
export interface IUser {
  username: string;
  userId: number;
}
export const user: Writable<IUser | null> = writable(null);
