<script lang="ts">
  import type { ITodo } from "../../models";
  import { user } from "../../user";
  interface IProps {
    todo: ITodo;
    getTodos: () => void;
  }
  let { todo, getTodos }: IProps = $props();
  const changeTodo = (event: KeyboardEvent, id: number, status: boolean) => {
    if (event.key !== "Enter") return;
    if ($user) {
      const input = event.target as HTMLInputElement;
      const res = fetch(`http://localhost:8001/user/${$user?.userId}/todos`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          title: input.value,
          is_done: status === true ? 1 : 0,
        }),
      });
    }
    getTodos();
  };
</script>

<div>
  <input
    type="text"
    value={todo.title}
    name=""
    id=""
    onkeydown={(event) => changeTodo(event, todo.id, todo.is_done)}
  />
  <input
    type="checkbox"
    checked={todo.is_done}
    name=""
    id=""
    onchange={(event) => {
      if ($user) {
        const res = fetch(`http://localhost:8001/user/${$user?.userId}/todos`, {
          method: "PUT",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: todo.id,
            title: todo.title,
            is_done: event.currentTarget.checked ? 1 : 0,
          }),
        });
      }
      getTodos();
    }}
  />
</div>
