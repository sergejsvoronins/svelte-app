<script lang="ts">
  import { Button } from "@sveltestrap/sveltestrap";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let data: { token: string };

  interface ITodoResponse {
    id: number;
    title: string;
    is_done: number;
    user_id: number;
  }
  let title: string;
  let todoList: { id: number; title: string; is_done: boolean }[] = [];
  onMount(async () => {
    const res = await fetch("http://localhost:8001/todos", {
      headers: {
        Authorization: data.token ?? "",
      },
    });
    const resData: ITodoResponse[] = await res.json();
    todoList = resData.map((todo) => {
      return {
        id: todo.id,
        title: todo.title,
        is_done: todo.is_done === 1 ? true : false,
      };
    });
    console.log(todoList);
  });
</script>

<Button>Logout</Button>
