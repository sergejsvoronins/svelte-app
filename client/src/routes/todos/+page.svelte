<script lang="ts">
  import { user } from "../../user";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  interface ITodo {
    id: number;
    title: string;
    is_done: boolean;
    userId: number;
  }

  export let data;
  // let todoList: ITodo[] = $state([]);
  let todoList = data?.todos ?? [];
  onMount(() => {
    if (!$user) {
      goto("/");
    }
  });
  const getTodos = async () => {
    const res = await fetch(
      `http://localhost:8001/user/${$user?.userId}/todos`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      }
    );
    const resData: {
      id: number;
      title: string;
      is_done: number;
      user_id: number;
    }[] = await res.json();

    const todos: ITodo[] = resData.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        is_done: todo.is_done === 1 ? true : false,
        userId: todo.user_id,
      };
    });
    todoList = todos;
  };

  const addTodo = (event: KeyboardEvent) => {
    if (event.key !== "Enter") return;
    if ($user) {
      const input = event.target as HTMLInputElement;

      const res = fetch(`http://localhost:8001/user/${$user?.userId}/todos`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ title: input.value }),
      });
      input.value = "";
    }
    getTodos();
  };
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
  <label for="addTodo">Add todo {$user?.username}</label>
  <input type="text" name="addTodo" id="addTodo" onkeydown={addTodo} />
  {#each todoList as todo}
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
            const res = fetch(
              `http://localhost:8001/user/${$user?.userId}/todos`,
              {
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
              }
            );
          }
          getTodos();
        }}
      />
    </div>
  {/each}
</div>
