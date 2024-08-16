import { redirect } from "@sveltejs/kit";
import { user } from "../../user";
import type { PageLoad } from "./$types";

interface ITodoResponse {
  id: number;
  title: string;
  is_done: number;
  user_id: number;
}
export const load: PageLoad = async (loadEvent) => {
  let userId = 0;
  let todos: {
    id: number;
    title: string;
    is_done: boolean;
    userId: number;
  }[] = [];
  user.subscribe((val) => (userId = val?.userId));
  if (userId) {
    const { fetch } = loadEvent;
    const title = "My todo app";
    const res = await fetch(`http://localhost:8001/user/${userId}/todos`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data: ITodoResponse[]) => {
        todos = data.map((todo) => {
          return {
            id: todo.id,
            title: todo.title,
            is_done: todo.is_done === 1 ? true : false,
            userId: todo.user_id,
          };
        });
      })
      .catch((err) => console.log(err));
    return { todos };
  }
};
