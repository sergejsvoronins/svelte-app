<script lang="ts">
  import { user } from "../../user";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Todo from "../../lib/components/Todo.svelte";
  import type { ITodo } from "../../models";
  import { Button, Checkbox, cls, ListItem, TextField } from "svelte-ux";

  let { data } = $props();
  let todoList: ITodo[] = $state([]);
  let newTodo: string = $state("");
  if (data.todos) {
    todoList = [...data.todos];
  }
  $effect.pre(() => {
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
      },
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

  const addTodo = (title: string) => {
    if ($user) {
      const input = event.target as HTMLInputElement;

      const res = fetch(`http://localhost:8001/user/${$user?.userId}/todos`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
    }
    getTodos();
  };
</script>

<div class="grid p-4">
  <div class="flex justify-center w-100 gap-2">
    <TextField
      labelPlacement="left"
      bind:value={newTodo}
      type="text"
      on:keydown={(event) => {
        if (event.key !== "Enter") return;
        addTodo(event.target.value);
        newTodo = "";
      }}
      classes={{ container: "w-80" }}
    ></TextField>
    <Button
      color="primary"
      variant="outline"
      classes={{ root: "w-20" }}
      on:click={() => addTodo(newTodo)}>Add todo</Button
    >
  </div>
  <h3 class="py-3">Active</h3>
  {#each todoList as todo}
    {#if !todo.is_done}
      <Todo {getTodos} {todo} />
    {/if}
  {/each}
  <h3 class="py-3">Completed</h3>
  {#each todoList as todo}
    {#if todo.is_done}
      <Todo {getTodos} {todo} />
    {/if}
  {/each}
</div>
