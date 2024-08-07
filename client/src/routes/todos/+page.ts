import { goto } from "$app/navigation";
import type { Cookies, LoadEvent } from "@sveltejs/kit";
interface ITodoResponse {
  id: number;
  title: string;
  is_done: number;
}

export const load = async ({
  loadEvent,
  cookies,
}: {
  cookies: Cookies;
  loadEvent: LoadEvent;
}) => {
  // const authToken = cookies.get("authToken");
  // console.log(authToken);
  // const { fetch } = loadEvent;
  // const title = "My todo app";
  // const res = await fetch("http://localhost:8001/todos", {
  //   headers: {
  //     Authorization: authToken ?? "",
  //   },
  // });
  // const resData: ITodoResponse[] = await res.json();
  // const todos = resData.map((todo) => {
  //   return {
  //     id: todo.id,
  //     title: todo.title,
  //     is_done: todo.is_done === 1 ? true : false,
  //   };
  // });
  // return {
  //   title,
  //   todos,
  // };
};
