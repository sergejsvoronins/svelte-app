import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";
export interface IUser {
  username: string;
  userId: number;
}
// export const user: Writable<IUser | null> = writable(null);
let persistedUser = browser && localStorage.getItem("user");

export let user = writable(persistedUser ? JSON.parse(persistedUser) : null);

if (browser) {
  user.subscribe((u) => localStorage.setItem("user", JSON.stringify(u)));
}
export function updateUser(data: IUser | null) {
  user.update((currentUser) => (currentUser = data));
}
