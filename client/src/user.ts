import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";
import type { IUser } from "./models";

// export const user: Writable<IUser | null> = writable(null);
let persistedUser = browser && localStorage.getItem("user");

export let user = writable(persistedUser ? JSON.parse(persistedUser) : null);

if (browser) {
  user.subscribe((u) => localStorage.setItem("user", JSON.stringify(u)));
}
export function updateUser(data: IUser | null) {
  user.update((currentUser) => (currentUser = data));
}
