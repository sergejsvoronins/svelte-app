<script lang="ts">
  import { user } from "../../user";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Todo from "../../lib/components/Todo.svelte";
  import type { ITodo } from "../../models";

  let { data } = $props();
  let todoList: ITodo[] = $state([]);

  if (data.todos) {
    todoList = [...data.todos];
  }
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
</script>

<div>
  <label for="addTodo">Add todo {$user?.username}</label>
  <input type="text" name="addTodo" id="addTodo" onkeydown={addTodo} />
  <h3>Active</h3>
  {#each todoList as todo}
    {#if !todo.is_done}
      <Todo {getTodos} {todo} />
    {/if}
  {/each}
  <h3>Completed</h3>
  {#each todoList as todo}
    {#if todo.is_done}
      <Todo {getTodos} {todo} />
    {/if}
  {/each}
</div>
